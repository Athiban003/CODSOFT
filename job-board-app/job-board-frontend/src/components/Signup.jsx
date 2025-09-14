import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ role }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [generalErr, setGeneralErr] = useState("");

  const navigate = useNavigate();
  function navigateLogin() {
    if (role) {
      navigate("/employer/login");
      return;
    }
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
    const roles = role ? role : "candidate";
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password, roles }),
      });
      const data = await res.json();
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
        if (roles) {
          navigate("/employer/login");
          return;
        }
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
    }

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-[1rem] max-w-[50rem] min-w-[27rem] text-[1.5rem] w-full mx-[2rem]">
        <h1 className="text-[3rem]">Signup</h1>

        <input
          placeholder="Enter your name"
          className="h-[4rem] border-[2px] border-black p-[0.8rem] w-full"
          ref={nameRef}
        />
        {nameErr && (
          <p className="text-red-600">Name should be minimum of length 3</p>
        )}

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
          Already have an account{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={navigateLogin}
          >
            Login
          </span>
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
export default Signup;
