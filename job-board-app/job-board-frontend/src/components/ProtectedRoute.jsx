import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resJson = await res.json();
        if (res.ok) {
          setIsAuthorized(true);
          sessionStorage.setItem("email", resJson.email);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
        return;
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [navigate]);
  return (
    <>
      {loading && <p>Loading...</p>}
      {isAuthorized ? children : null}
    </>
  );
}
export default ProtectedRoute;
