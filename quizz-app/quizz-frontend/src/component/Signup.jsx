import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [generalErr, setGeneralErr] = useState("");

  const navigate = useNavigate();
  function navigateLogin() {
    navigate("/login");
  }

  async function handleSubmit() {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let isErr = false;

    setNameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setGeneralErr("");

    if (name.length < 3) {
      setNameErr(true);
      isErr = true;
    }
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        if (res.status == 409) {
          setGeneralErr(data.message);
          return;
        }
        setGeneralErr("something went wrong");
        return;
      }
      setGeneralErr(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }

    console.log(nameRef.current.value);
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <div className="h-screen flex items-center justify-center  ">
      <div className="w-full px-[2rem]">
        <h1 className="text-[2.4rem] font-bold leading-[2.7rem] tracking-wide  text-center">
          Create your account
        </h1>
        <p className="mt-[.8rem] text-[1.5rem] text-gray-600 text-center tracking-wide">
          Let's get started!
        </p>

        <p className="mt-[3rem] text-[1.4rem]">Name</p>
        <input
          type="text"
          placeholder="Enter your name "
          className="h-[3.5rem] border w-full rounded-[6px] px-[1rem] placeholder:text-[1.3rem] text-[1.3rem] mt-[.5rem]"
          ref={nameRef}
        />
        {nameErr && (
          <p className="text-red-600 text-[1.3rem]">
            Name should be minimum of length 3
          </p>
        )}

        <p className="mt-[2rem] text-[1.4rem]">Email</p>
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
          Signup{" "}
        </button>

        <p className="text-center mt-[2.5rem] text-[1.4rem]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
