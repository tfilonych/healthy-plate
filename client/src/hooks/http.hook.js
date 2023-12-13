import { useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);

      try {
        if (body) {
          if (body.file) {
            const formData = new FormData();

            Object.keys(body).forEach(key => formData.append(key, body[key]));
            body = formData;
          } else {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
          }
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

  const clearError = () => setError(null);

  return {
    loading,
    request,
    error,
    clearError,
  };
};
