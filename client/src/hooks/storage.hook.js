import React, { useEffect, useState } from 'react';

const useStorage = (storageName) => {
  if (!storageName) return;

  const getStorageValue = () => {
    const val = localStorage[storageName];

    try {
      if (val !== null) {
        try {
          return JSON.parse(val);
        } catch (e) {
          /* storage with the key "storageName" doesn't contain an object */
          return val;
        }
      }
    } catch (e) {
      console.warn(e.message);
    }
    return null;
  }

  const [storageVal, setStorageVal] = useState(() => getStorageValue());

  const updateStorage = (val) => {
    localStorage.setItem(
      storageName,
      JSON.stringify(val));
  }

  const clearStorage = () => {
    localStorage.removeItem(storageName);
  }

  const syncLocalStorage = (e) => {
    if (e.key === key) {
      setStorageVal(e.newValue);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', syncLocalStorage);

    return () => {
      window.removeEventListener('storage', syncLocalStorage);
    };
  }, []);


  return {
    storageVal,
    updateStorage,
    clearStorage
  }
}

export default useStorage;
