import { useCallback, useState } from "react";

export function useAuthFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // we use useCallback because the function reference will change on every render
  const authFetch = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

          ...(options.headers || {}),
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { authFetch, loading, error };
}
