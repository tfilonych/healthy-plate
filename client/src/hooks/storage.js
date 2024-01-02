import React, { useEffect, useState } from 'react';
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
}
const useStorage = (storageName) => {
  if (!storageName) return;


  // const getStorageValue = () => {
  //   const val = localStorage.getItem(storageName);
  //
  //   if (val) {
  //     try {
  //       return JSON.parse(val);
  //     } catch (e) {
  //       /* storage with the key "storageName" doesn't contain an object */
  //       //return val;
  //     }
  //   }
  //   return null;
  // }

  const [storageVal, setStorageVal] = useState(null);

  useEffect(() => {
    setStorageVal(() => getStorageValue(storageName))
  }, []);


  const updateStorage = (val) => {
    localStorage.setItem(
      storageName,
      JSON.stringify(val));
  }

  const clearStorage = () => {
    localStorage.removeItem(storageName);
  }

  const syncLocalStorage = (e) => {
    if (e.key === storageName) {
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
