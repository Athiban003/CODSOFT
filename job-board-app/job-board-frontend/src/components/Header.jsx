import { useNavigate } from "react-router-dom";
import {
  messageIcon,
  bookmarkIcon,
  menuIcon,
  notificationIcon,
} from "../assets/index";
import { useState } from "react";
import Menu from "./Menu";

function Header() {
  const navigate = useNavigate();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function navigateSavedJobs() {
    navigate("/dashboard/saved-jobs");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[2.2rem] font-bold text-blue-800 flex-1">
            Job Board
          </h1>
        </div>

        <div className="flex gap-[2rem]  justify-between ml-[2rem]">
          <div className="hover:bg-gray-200 hover:p-[.5rem] transition-all duration-300 rounded-[4px]">
            <img
              src={bookmarkIcon}
              alt="messageIcon"
              className="h-[2rem] cursor-pointer "
              onClick={navigateSavedJobs}
            />
          </div>
          <div className="hover:bg-gray-200 hover:p-[.5rem] transition-all duration-300 rounded-[4px]">
            <img
              src={messageIcon}
              alt="messageIcon"
              className="h-[2rem] cursor-pointer"
            />
          </div>
          <div className="hover:bg-gray-200 hover:p-[.5rem] transition-all duration-300 rounded-[4px]">
            <img
              src={notificationIcon}
              alt="messageIcon"
              className="h-[2rem] cursor-pointer"
            />
          </div>
          <div
            className="hover:bg-gray-200 hover:p-[.5rem] transition-all duration-300 rounded-[4px]"
            onClick={() => setIsMenuOpened(true)}
          >
            <img
              src={menuIcon}
              alt="messageIcon"
              className="h-[2rem] cursor-pointer"
            />
          </div>
        </div>
        {isMenuOpened && <Menu setIsMenuOpened={setIsMenuOpened} />}
      </div>
    </>
  );
}
export default Header;
