import React, { createContext, useContext, useState, useCallback } from 'react';

const PhotoContext = createContext(null);

const STORAGE_KEY = 'bday_photos_v1';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profile: null, story: Array(3).fill(null), gallery: Array(6).fill(null) };
    const parsed = JSON.parse(raw);
    if (!parsed.story) parsed.story = Array(3).fill(null);
    if (!parsed.gallery) parsed.gallery = Array(6).fill(null);
    return parsed;
  } catch {
    return { profile: null, story: Array(3).fill(null), gallery: Array(6).fill(null) };
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save photos to localStorage:', e);
  }
}

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState(() => loadFromStorage());

  const setProfilePhoto = useCallback((dataUrl) => {
    setPhotos(prev => {
      const next = { ...prev, profile: dataUrl };
      saveToStorage(next);
      return next;
    });
  }, []);

  const setStoryPhoto = useCallback((index, dataUrl) => {
    setPhotos(prev => {
      const story = [...(prev.story || Array(3).fill(null))];
      story[index] = dataUrl;
      const next = { ...prev, story };
      saveToStorage(next);
      return next;
    });
  }, []);

  const setGalleryPhoto = useCallback((index, dataUrl) => {
    setPhotos(prev => {
      const gallery = [...(prev.gallery || Array(6).fill(null))];
      gallery[index] = dataUrl;
      const next = { ...prev, gallery };
      saveToStorage(next);
      return next;
    });
  }, []);

  const clearPhoto = useCallback((type, index) => {
    setPhotos(prev => {
      let next;
      if (type === 'profile') {
        next = { ...prev, profile: null };
      } else if (type === 'story') {
        const story = [...(prev.story || Array(3).fill(null))];
        story[index] = null;
        next = { ...prev, story };
      } else {
        const gallery = [...(prev.gallery || Array(6).fill(null))];
        gallery[index] = null;
        next = { ...prev, gallery };
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, setProfilePhoto, setStoryPhoto, setGalleryPhoto, clearPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const ctx = useContext(PhotoContext);
  if (!ctx) throw new Error('usePhotos must be used inside PhotoProvider');
  return ctx;
}
