import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../context/GlobalContext";

function useBookmark() {
  const navigate = useNavigate();
  const { localJobs, setLocalJobs, setSavedJobs } = useContext(GlobalState);

  async function toggleBookmark(e, jobId, isBookmarked) {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLocalJobs((prev) =>
      prev.map((j) =>
        j._id === jobId ? { ...j, isBookmarked: !isBookmarked } : j
      )
    );

    setSavedJobs((prev) => {
      if (isBookmarked) {
        return prev.filter((j) => j._id !== jobId);
      } else {
        return prev;
      }
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/bookmark`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ jobId }),
        }
      );
      if (res.status === 401) {
        console.error("Unauthorized access, Token might be expired or Invalid");
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (res.ok) {
        if (res.status === 204) {
          console.error("Bookmarked successfully, no response body");
        }
      }
    } catch (err) {
      console.error("error", err);
    }
  }

  function handleNotInterested(e) {
    e.stopPropagation();
  }

  return { localJobs, setLocalJobs, toggleBookmark, handleNotInterested };
}
export default useBookmark;
