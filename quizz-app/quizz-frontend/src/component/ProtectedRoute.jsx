import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  return children;
}
export default ProtectedRoute;
