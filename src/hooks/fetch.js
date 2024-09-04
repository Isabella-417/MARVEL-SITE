import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

function useFetch(url, options) {
  const pk = import.meta.env.VITE_APP_PK;
  const prk = import.meta.env.VITE_APP_PRK;
  const timestamp = 1000;
  const key = CryptoJS.MD5(`${timestamp}${prk}${pk}`).toString();
  const newUrl = `${url}ts=${timestamp}&apikey=${pk}&hash=${key}`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(newUrl, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newUrl, url]);

  return { data, loading, error };
}

export default useFetch;
