import { useNavigate } from "react-router-dom";
import "../styles/index.css";

function GuestHeader() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/signup");
  }

  function handleEmployerLogin() {
    navigate("/employer");
  }

  return (
    <div className="flex justify-between ">
      <div>
        <h1 className="text-[2rem] font-bold text-blue-800">Job Board</h1>
      </div>
      <div className="flex items-center gap-[1rem]">
        <h3
          className="inline text-[1.8rem] cursor-pointer  text-blue-800 py-[.1rem] px-[0.5rem] rounded-[4px] "
          onClick={handleSignup}
        >
          Signup
        </h3>
        <h3
          className="inline text-[1.7rem] cursor-pointer"
          onClick={handleLogin}
        >
          {" "}
          Login
        </h3>
        <span className="text-[1.7rem] desktop-only">|</span>
        <h3
          className="text-[1.6rem] desktop-only cursor-pointer"
          onClick={handleEmployerLogin}
        >
          Employers/Post job
        </h3>
      </div>
    </div>
  );
}
export default GuestHeader;
