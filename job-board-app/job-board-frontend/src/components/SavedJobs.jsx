import JobCard from "./JobCard";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { GlobalState } from "../context/GlobalContext";

function SavedJobs() {
  const { savedJobs, setSavedJobs } = useContext(GlobalState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchSavedJob() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/saved-jobs`,
          {
            "content-type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (res.ok) {
          const jobs = await res.json();
          setSavedJobs(jobs);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSavedJob();
  }, []);

  return (
    <>
      <div className="px-[1.5rem] py-[1rem] items-center ">
        <Header />
        <h1 className="text-[2rem] mt-[1rem]">My Jobs</h1>
        {savedJobs.length <= 0 ? (
          <div>no job</div>
        ) : (
          <JobCard savedJobs={savedJobs} />
        )}
      </div>
    </>
  );
}
export default SavedJobs;
