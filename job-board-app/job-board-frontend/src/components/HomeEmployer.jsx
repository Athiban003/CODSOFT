import { Link } from "react-router-dom";
import { jobPhoto } from "../assets";
function HomeEmployer() {
  return (
    <div>
      <div className="bg-black h-[6rem] text-white flex px-[2rem] items-center justify-between">
        <div>
          <h1 className="text-[2rem] font-bold ">Job Board</h1>
          <p className="ml-[2.5rem]">for employeers</p>
        </div>
        <div>
          <button className="bg-blue-700 px-[1rem] text-[1.6rem] font-bold py-[.5rem] rounded-[7px]">
            Log in
          </button>
        </div>
      </div>

      <div className="px-[2.5rem] grid grid-cols-2 items-center h-screen">
        <div className="">
          <h1 className="text-[5.5rem]">
            Let's hire your next great candidate Fast
          </h1>
          <Link to={"/employer/signup"}>
            <button className="bg-blue-700 px-[5rem] text-[2.5rem] font-bold py-[.5rem] rounded-[7px] text-white mt-[2rem]">
              Post a job
            </button>
          </Link>
        </div>
        <div className="">
          <img src={jobPhoto} alt="" />
        </div>
      </div>
    </div>
  );
}
export default HomeEmployer;
