import { useState, useEffect } from 'react';
import { getProfilePhoto, saveProfilePhoto } from './storageService';
import { personalInfo } from '../data/portfolioData';

export function useProfilePhoto() {
  const [photo, setPhoto] = useState<string>(personalInfo.photo || '/vidhan-photo.png');

  useEffect(() => {
    // Load stored photo on mount
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
          // dispatch custom event for intra-tab synchronization
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
    setPhoto('/vidhan-photo.png');
    window.dispatchEvent(new CustomEvent('photo-updated', { detail: '/vidhan-photo.png' }));
  };

  return { photo, updatePhoto, resetPhoto };
}
