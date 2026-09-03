import { useState, useEffect } from 'react';
import { getProfilePhoto, saveProfilePhoto } from './storageService';
import { personalInfo } from '../data/portfolioData';

export function useProfilePhoto() {
  // Set the default directly to your new photo:
  const [photo, setPhoto] = useState<string>('/profile.png');

  useEffect(() => {
    getProfilePhoto().then((stored) => {
      if (stored) {
        setPhoto(stored);
      }
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'vidhan_custom_photo' && e.newValue) {
        setPhoto(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updatePhoto = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        if (result) {
          setPhoto(result);
          await saveProfilePhoto(result);
          window.dispatchEvent(new CustomEvent('photo-updated', { detail: result }));
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const resetPhoto = () => {
    localStorage.removeItem('vidhan_custom_photo');
    setPhoto('/profile.png');
    window.dispatchEvent(new CustomEvent('photo-updated', { detail: '/profile.png' }));
  };

  return { photo, updatePhoto, resetPhoto };
}
