import { useEffect, useState } from 'react';

const useStorage = (storageName) => {
  if (!storageName) return;
  const [storageVal, setStorageVal] = useState(null);

  const getStorageValue = () => {
    const val = localStorage.getItem(storageName);

    if (val) {
      try {
        return JSON.parse(val);
      } catch (e) {
        /* storage with the key "storageName" doesn't contain an object */
        //return val;
      }
    }
    return null;
  };

  useEffect(() => {
    setStorageVal(() => getStorageValue(storageName));
    window.addEventListener('storage', syncLocalStorage);
    return () => {
      window.removeEventListener('storage', syncLocalStorage);
    };
  }, []);


  const updateStorage = (val) => {
    localStorage.setItem(
      storageName,
      JSON.stringify(val));
  };

  const clearStorage = () => {
    localStorage.removeItem(storageName);
  };

  const syncLocalStorage = (e) => {
    if (e.key === storageName) {
      setStorageVal(e.newValue);
    }
  };

  return {
    storageVal,
    updateStorage,
    clearStorage
  };
};

export default useStorage;
