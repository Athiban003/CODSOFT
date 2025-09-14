export async function fetchWithAuth(url, options = {}) {
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

  return res.json();
}
