import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useContext must be used within a DataProvider');
  }
  return context;
};

export default useAuthContext;