import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="h-screen flex items-center justify-center px-[2.5rem] text-center">
        <div className="">
          <h1 className="text-[2.6rem] font-bold leading-[2.7rem] tracking-wide">
            Welcome to<br></br> QuizUp
          </h1>
          <p className="mt-[1.2rem] text-[1.3rem] text-gray-600">
            Join our community of quiz enthusiasts and challenge your knowledge
          </p>
          <Link to="/signup">
            <button className="bg-red-500 hover:bg-red-600 text-white text-[1.5rem] p-[.8rem] mt-[3rem] w-full rounded-[7px]">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-200 hover:bg-gray-300 text-black text-[1.5rem] p-[.8rem] mt-[1rem] w-full rounded-[7px]">
              Login
            </button>
          </Link>
          <button className="hover:bg-gray-100 text-black text-[1.5rem] p-[.8rem] mt-[1rem] w-full rounded-[7px]">
            Browse as Guest
          </button>
        </div>
      </div>
    </>
  );
}
export default Home;
