import { useContext, useEffect } from "react";
import Search from "./Search";
import WelcomePage from "./WelcomePage";
import { GlobalState } from "../context/GlobalContext";
import GuestHeader from "./GuestHeader";

function Home() {
  const { localJobs, setLocalJobs } = useContext(GlobalState);

  useEffect(() => {
    const guestJobs = localJobs.map((job) => {
      return { ...job, isBookmarked: false };
    });
    setLocalJobs(guestJobs);
  }, []);

  localStorage.removeItem("token");
  return (
    <>
      <div className="px-[2rem] py-[1rem] items-center">
        <GuestHeader />
        <div className="mt-[2rem]">
          <Search />
        </div>
        {localJobs.length <= 0 && (
          <div className="mt-[3rem] flex items-center justify-center">
            <WelcomePage />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
