import { useContext } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../context/GlobalContext";

function Menu({ setIsMenuOpened }) {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const { setLocalJobs } = useContext(GlobalState);

  function handleClose() {
    setIsMenuOpened(false);
  }

  function handleHomePage() {
    setIsMenuOpened(false);
    navigate("/dashboard");
  }

  function handleSignout() {
    setIsMenuOpened(false);
    localStorage.removeItem("token");
    sessionStorage.setItem("dashboard-scroll", 0);
    setLocalJobs([]);
    navigate("/");
  }
  return (
    <>
      {createPortal(
        <div>
          <div
            className="fixed inset-0 bg-gray-800 cursor-pointer opacity-[.5]"
            onClick={handleClose}
          ></div>

          <div className="fixed right-0 left-[33%] top-0 bottom-0 bg-white  text-[1.7rem]  flex flex-col gap-[1.5rem]">
            <div className="w-full flex justify-end px-[1.5rem]">
              <button onClick={handleClose} className="text-[3rem]">
                x
              </button>
            </div>
            <div className="flex justify-between px-[1.5rem] hover:cursor-pointer  group">
              <p className="group-hover:underline">Profile</p>
              <span>&gt;</span>
            </div>
            <hr />
            <div
              className="flex justify-between px-[1.5rem] hover:cursor-pointer  group"
              onClick={handleHomePage}
            >
              <p className="group-hover:underline">Home</p>
              <span>&gt;</span>
            </div>
            <hr />
            <div
              className="flex justify-between px-[1.5rem] hover:cursor-pointer  group items-center"
              onClick={handleSignout}
            >
              <div className="group-hover:underline">
                <p>Sign out</p>
                <p className="text-gray-500 text-[1.5rem]">{email}</p>
              </div>
              <span>&gt;</span>
            </div>
            <hr />

            <div className="flex justify-between px-[1.5rem]    text-gray-500">
              <p>© 2025 Job Board</p>
            </div>
            <hr />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
export default Menu;
