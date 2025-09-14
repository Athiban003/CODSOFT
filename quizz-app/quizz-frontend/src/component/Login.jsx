import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [generalErr, setGeneralErr] = useState("");

  async function handleSubmit() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let isErr = false;

    setEmailErr(false);
    setPasswordErr(false);
    setGeneralErr("");

    if (!email.includes("@")) {
      setEmailErr(true);
      isErr = true;
    }
    if (password.length < 6) {
      setPasswordErr(true);
      isErr = true;
    }
    if (isErr) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        if (res.status === 404 || res.status === 401) {
          setGeneralErr(data.message);
          return;
        }
        setGeneralErr("something went wrong");
        return;
      }

      emailRef.current.value = "";
      passwordRef.current.value = "";

      setGeneralErr(data.message);
      localStorage.setItem("token", data.token);

      navigate("/quizzes");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center  ">
      <div className="w-full px-[2rem]">
        <h1 className="text-[2.6rem] font-bold leading-[2.7rem] tracking-wide  text-center">
          Welcome Back
        </h1>
        <p className="mt-[.8rem] text-[1.5rem] text-gray-600 text-center tracking-wide">
          Login to create your quizzes
        </p>

        <p className="mt-[3rem] text-[1.4rem]">Email</p>
        <input
          type="email"
          placeholder="Enter your email address "
          className="h-[3.5rem] border w-full rounded-[6px] px-[1rem] placeholder:text-[1.3rem] text-[1.3rem] mt-[.5rem]"
          ref={emailRef}
        />
        {emailErr && (
          <p className="text-red-600 text-[1.3rem]">Invalid Email address</p>
        )}

        <p className="mt-[2rem] text-[1.4rem]">Password</p>
        <input
          type="text"
          placeholder="Enter your password "
          className="h-[3.5rem] border w-full rounded-[6px] px-[1rem] placeholder:text-[1.3rem] text-[1.3rem] mt-[.5rem]"
          ref={passwordRef}
        />
        {passwordErr && (
          <p className="text-red-600 text-[1.3rem]">Min length should be 6</p>
        )}

        {generalErr && (
          <p className="text-red-600 text-[1.3rem]">{generalErr}</p>
        )}

        <button
          className="bg-red-500 hover:bg-red-600 text-white text-[1.5rem] p-[.8rem] mt-[3rem] w-full rounded-[7px]"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="text-center mt-[2.5rem] text-[1.4rem]">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
export default Login;
