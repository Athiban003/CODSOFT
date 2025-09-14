import { useNavigate } from "react-router-dom";
import { jobPhoto } from "../assets/index";

function WelcomePage() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/signup");
  }
  return (
    <>
      <div className="mt-[3rem] flex flex-col justify-center items-center w-full ">
        <div className="max-w-[90rem]">
          <img
            src={jobPhoto}
            className="w-full object-cover "
            alt="wecome image"
          />
        </div>
        <div className="flex text-center flex-col">
          <h1 className="text-[2.5rem] font-bold">Welcome to Job Board</h1>
          <h3 className="text-[1.5rem] mt-[1rem]">
            Create an account or sign in to see your personalized job
            recommendations.
          </h3>
        </div>
        <button
          className="text-[2rem] text-white bg-blue-800 w-full rounded-[.5rem] h-[4.5rem] mt-[2.5rem]"
          onClick={handleLogin}
        >
          Signup
        </button>
      </div>
    </>
  );
}
export default WelcomePage;
