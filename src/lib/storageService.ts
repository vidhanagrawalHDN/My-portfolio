// Storage Service supporting Local IndexedDB, Server Filesystem, and Cloudflare R2

const DB_NAME = 'VidhanPortfolioDB';
const DB_VERSION = 1;
const STORE_CERTIFICATES = 'certificates_vault';
const STORE_ASSETS = 'portfolio_assets';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_CERTIFICATES)) {
        db.createObjectStore(STORE_CERTIFICATES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_ASSETS)) {
        db.createObjectStore(STORE_ASSETS, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save Photo
export async function saveProfilePhoto(dataUrl: string): Promise<boolean> {
  try {
    // 1. Save to localStorage
    localStorage.setItem('vidhan_custom_photo', dataUrl);

    // 2. Save to IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_ASSETS, 'readwrite');
      tx.objectStore(STORE_ASSETS).put({ key: 'profile_photo', data: dataUrl, timestamp: Date.now() });
    } catch (e) {
      console.warn('IndexedDB photo save fallback:', e);
    }

    // 3. POST to Server API for filesystem persistence
    try {
      await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl })
      });
    } catch (e) {
      console.warn('Server filesystem photo save failed (running client-only):', e);
    }

    return true;
  } catch (err) {
    console.error('Error saving photo:', err);
    return false;
  }
}

// Get Profile Photo
export async function getProfilePhoto(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // 1. Check localStorage
  const local = localStorage.getItem('vidhan_custom_photo');
  if (local) return local;

  // 2. Check IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_ASSETS, 'readonly');
    const store = tx.objectStore(STORE_ASSETS);
    const result: any = await new Promise((resolve) => {
      const req = store.get('profile_photo');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });

    if (result && result.data) {
      localStorage.setItem('vidhan_custom_photo', result.data);
      return result.data;
    }
  } catch (e) {
    // fallback
  }

  return null;
}

// Save Certificate PDF Document
export async function saveCertificateDocument(certId: string, file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;

        // 1. Save to IndexedDB
        const db = await openDB();
        const tx = db.transaction(STORE_CERTIFICATES, 'readwrite');
        tx.objectStore(STORE_CERTIFICATES).put({
          id: certId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          data: base64Data,
          uploadedAt: new Date().toISOString()
        });

        // 2. Upload to server
        try {
          await fetch('/api/upload-certificate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certId, fileData: base64Data, fileName: file.name })
          });
        } catch (e) {
          // ignore server failure
        }

        resolve(base64Data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Get Stored Certificate Document
export async function getCertificateDocument(certId: string): Promise<string | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_CERTIFICATES, 'readonly');
    const store = tx.objectStore(STORE_CERTIFICATES);
    const result: any = await new Promise((resolve) => {
      const req = store.get(certId);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });

    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    // fallback
  }
  return null;
}

// Cloudflare R2 Configuration Helper (Free Tier Storage)
export interface CloudflareR2Config {
  accountId: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicDomain?: string;
}

export const CLOUDFLARE_FREE_TIER_INFO = {
  service: "Cloudflare R2 Object Storage",
  freeAllowance: "10 GB / month free storage, 1M Class A operations/month, zero egress bandwidth fees",
  setupSteps: [
    "1. Log in to Cloudflare Dashboard (dash.cloudflare.com) and navigate to R2 Storage",
    "2. Create a free bucket (e.g. 'vidhan-portfolio-vault')",
    "3. Generate R2 API tokens (Manage R2 API Tokens > Create API Token)",
    "4. Add your R2 credentials to .env (or upload directly into the app's persistent database storage)"
  ]
};
