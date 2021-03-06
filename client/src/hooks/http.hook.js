import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      console.log(body)

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
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    loading,
    request,
    error,
    clearError,
  };
};
