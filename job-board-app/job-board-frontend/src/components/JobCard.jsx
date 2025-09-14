import { useEffect, useState } from "react";
import { bookmarkTransIcon, notInterested, bookmarkIcon } from "../assets";
import useBookmark from "../hooks/useBookmark";
import { useNavigate } from "react-router-dom";

function JobCard({ savedJobs }) {
  const { localJobs, toggleBookmark, handleNotInterested } = useBookmark();
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  function handleNavigate(job) {
    sessionStorage.setItem("dashboard-scroll", window.scrollY);
    navigate(`/job-detail/${job._id}`, { state: job });
  }

  useEffect(() => {
    if (savedJobs) {
      setJobs(savedJobs);
    } else {
      setJobs(localJobs);
    }
  }, [savedJobs, localJobs]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("dashboard-scroll");
    if (savedScroll) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      });
    }
  }, []);

  return (
    <>
      {jobs.length > 0 &&
        jobs.map((j) => {
          return (
            <div
              className="flex  w-full border-[1px] border-[rgb(199,194,194)] rounded-[1rem] px-[1.5rem] pt-[1rem] pb-[2rem] mt-[1rem] cursor-pointer"
              onClick={() => handleNavigate(j)}
              key={j._id}
            >
              <div className=" flex-1  mr-[1rem]">
                <a className="text-[1.7rem] font-bold line-clamp-2">
                  {j.job_title}
                </a>
                <div className="mt-[1.5rem] text-[1.5rem]">
                  <p>{j.job_location}</p>
                </div>
              </div>

              <div className="flex flex-col mt-[.8rem] items-end">
                <img
                  src={j.isBookmarked ? bookmarkIcon : bookmarkTransIcon}
                  alt="bookmark Icon"
                  className="h-[2rem]"
                  onClick={(e) => {
                    toggleBookmark(e, j._id, j.isBookmarked);
                  }}
                />
                <img
                  src={notInterested}
                  alt="notInterested Icon"
                  className="h-[2rem] mt-[2.3rem]"
                  onClick={(e) => handleNotInterested(e)}
                />
              </div>
              <div></div>
            </div>
          );
        })}
    </>
  );
}
export default JobCard;
