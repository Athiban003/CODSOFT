import { useContext, useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import { GlobalState } from "../context/GlobalContext";

function Search() {
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const { localJobs, setLocalJobs, filters, setFilters } =
    useContext(GlobalState);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReachedEnd, setIsReachedEnd] = useState(false);
  const [isNoJobs, setIsNoJobs] = useState(false);

  const pageRef = useRef(page);
  const loadingRef = useRef(isLoading);
  const endRef = useRef(isReachedEnd);

  const localJobsRef = useRef(localJobs);

  const token = localStorage.getItem("token");

  useEffect(() => {
    localJobsRef.current = localJobs;
  }, [localJobs]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    endRef.current = isReachedEnd;
  }, [isReachedEnd]);

  useEffect(() => {
    titleRef.current.value = filters.title;
    locationRef.current.value = filters.location;
  }, []);
  async function fetchJobs(title, location, page) {
    const res = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/jobs?title=${title}&location=${location}&page=${page}`,
      {
        "content-type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    return data;
  }

  async function handleSearch(isFirstSearch) {
    try {
      setIsError(false);
      const title = titleRef.current.value;
      const location = locationRef.current.value;

      if (!isFirstSearch && !title && !location) {
        setIsError(true);
        return;
      }

      setFilters({ title, location });

      const data = await fetchJobs(title, location, 1);
      if (data.length === 0 && localJobs.length === 0) {
        setIsNoJobs(true);
        return;
      }
      if (data.length === 0) {
        setIsReachedEnd(true);
        return;
      }
      setLocalJobs(data);
      setPage(2);
      setIsNoJobs(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function handleScroll() {
      if (
        !loadingRef.current &&
        !endRef.current &&
        localJobsRef.current.length > 0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 700
      ) {
        loadingRef.current = true;
        setIsReachedEnd(false);
        endRef.current = false;
        setIsLoading(true);
        const title = titleRef.current?.value;
        const location = locationRef.current?.value;

        const data = await fetchJobs(title, location, pageRef.current);

        if (data.length === 0) {
          setIsReachedEnd(true);
          endRef.current = true;
        } else {
          setLocalJobs((prev) => {
            const ids = new Set(prev.map((j) => j._id));
            const filtered = data.filter((j) => !ids.has(j._id));
            return [...prev, ...filtered];
          });
          setPage((prev) => prev + 1);
        }
        setIsLoading(false);
        loadingRef.current = false;
      }
    }
    window.addEventListener("scroll", handleScroll);

    if (localJobs.length === 0 && token) handleSearch(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="shadow-custom rounded-[10px] overflow-hidden">
        <input
          placeholder="Job title,keywords"
          className="h-[5rem] w-full pl-3  placeholder:text-[1.4rem] text-[1.6rem]"
          ref={titleRef}
        ></input>
        <br />
        <hr />
        <input
          placeholder="Search City or State"
          className="h-[5rem] w-full pl-3 placeholder:text-[1.4rem] text-[1.6rem]"
          ref={locationRef}
        ></input>
      </div>
      <button
        className="w-full bg-blue-800 text-[1.8rem] text-white font-bold h-[4rem] mt-[1rem] rounded-[7px] "
        onClick={() => handleSearch(false)}
      >
        Find Jobs
      </button>
      {isError && (
        <p className="text-red-600 text-[1.4rem] mt-[1rem]">
          Enter a job's title or location to start search
        </p>
      )}
      {localJobs.length > 0 && (
        <div>
          <h1 className="text-[2rem] font-bold mt-[1rem]">Jobs for you</h1>
        </div>
      )}
      <JobCard />
      {isNoJobs && (
        <div>
          <p className="text-[2rem] mt-[3rem] font-bold text-red-500">
            No Jobs Found Try searching another key word
          </p>
        </div>
      )}
      {isReachedEnd && (
        <p className="text-red-700 text-[2rem] text-center">Reached the end</p>
      )}
    </>
  );
}
export default Search;
