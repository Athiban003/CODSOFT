import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../context/GlobalContext";

function Login({ role }) {
  const navigate = useNavigate();

  const { setLocalJobs } = useContext(GlobalState);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [generalErr, setGeneralErr] = useState("");

  function navigateSignup() {
    if (role === "employer") {
      navigate("/employer/signup");
    } else {
      navigate("/signup");
    }
  }

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
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
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

      if (role === "candidate") {
        setLocalJobs([]);

        navigate("/dashboard");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-[1rem] max-w-[50rem] min-w-[27rem] text-[1.5rem] w-full mx-[2rem]">
        <h1 className="text-[3rem]">Login</h1>

        <input
          placeholder="Enter your email"
          className="h-[4rem] border-[2px] border-black p-[0.8rem]"
          ref={emailRef}
        />
        {emailErr && <p className="text-red-600">Invalid Email address</p>}

        <input
          placeholder="Enter you password"
          className="h-[4rem] border-[2px] border-black p-[0.8rem]"
          ref={passwordRef}
        />
        {passwordErr && <p className="text-red-600">Min length should be 6</p>}

        {generalErr && <p className="text-red-600">{generalErr}</p>}

        <p>
          Create an account{" "}
          <a className="text-blue-500 cursor-pointer" onClick={navigateSignup}>
            Signup
          </a>
        </p>
        <button
          className="w-full bg-blue-800 text-[1.8rem] text-white font-bold h-[4rem] mt-[1rem] rounded-[7px]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default Login;
