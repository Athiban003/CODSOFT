import { useLocation, useNavigate } from "react-router-dom";
import { bookmarkTransIcon, notInterested, bookmarkIcon } from "../assets";

import Header from "./Header";
import { useEffect, useState } from "react";
import useBookmark from "../hooks/useBookmark";
import GuestHeader from "./GuestHeader";

function JobDetail() {
  const location = useLocation();
  const job = location.state;
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);

  const token = localStorage.getItem("token");

  function handleLogin(url) {
    if (!token) {
      navigate("/login");
    } else {
      window.open(url, "_blank");
    }
  }
  const { toggleBookmark } = useBookmark();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="px-[1.5rem] py-[1rem] items-center ">
        {token ? <Header /> : <GuestHeader />}
        <div className="  mt-[1.5rem]   ">
          <div className=" shadow-[0px_5px_6px_-4px_rgb(131,129,129)] px-[1rem] pb-[2rem] border-[1px] border-b-0 border-[rgb(217,216,216)] rounded-[5px] rounded-b-none">
            <h1 className="font-bold text-[2rem]">{job.job_title}</h1>
            <a
              href={job.company_website}
              className="underline text-[1.4rem] mt-[1.1rem] block"
            >
              {job.company_name}
            </a>
            <p className="text-[1.6rem]">{job.job_location}</p>

            <div className="flex items-center mt-[1.2rem]  gap-[2rem] ">
              <button
                className="text-[1.6rem] font-bold text-white bg-blue-800 py-[.5rem] px-[1.3rem] rounded-[4px]"
                onClick={() => handleLogin(job.job_apply_link)}
              >
                Apply now
              </button>
              <img
                src={isBookmarked ? bookmarkIcon : bookmarkTransIcon}
                alt="bookmark Icon"
                className="h-[2rem] cursor-pointer"
                onClick={(e) => {
                  toggleBookmark(e, job._id, isBookmarked);
                  setIsBookmarked(!isBookmarked);
                }}
              />
              <img
                src={notInterested}
                alt="notInteresed Icon"
                className="h-[2rem] cursor-pointer"
              />
            </div>
          </div>

          <div className="overflow-scroll h-screen px-[1rem] border-[1px] border-t-0 border-[rgb(217,216,216)] rounded-[5px] ">
            <h1 className="text-[1.7rem] font-bold mt-[2rem]">Job details</h1>
            <p className="text-[1.5rem] font-bold mt-[1rem] ">Job Type</p>
            <p className="text-[1.5rem] mb-[1.7rem]">
              -&gt;{job.job_employement_type}
            </p>
            {job.job_benefits && (
              <div>
                <h1 className="whitespace-pre-wrap break-words text-[1.7rem] font-bold">
                  Benefits
                </h1>
                <pre className="text-[1.5rem]">{job.job_benefits}</pre>
              </div>
            )}
            <div>
              <h1 className="text-[1.7rem] font-bold mb-[.5rem]">
                Full Job description
              </h1>
              <pre className="whitespace-pre-wrap break-words text-[1.5rem]">
                {job.job_description}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default JobDetail;
