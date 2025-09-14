import { Link } from "react-router-dom";

function Navigation() {
  const location = window.location.pathname;
  console.log(location);

  return (
    <div
      className={` b-0 items-center flex justify-between px-[2rem] relative border-t `}
    >
      <Link
        to="/quizzes"
        className={`${location === "/quizzes" ? "text-red-500" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77"
          />
        </svg>
        Home
      </Link>
      <Link
        to="/quizzes/create"
        className="absolute left-[50%] translate-x-[-50%] top-[-1rem] text-center  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4.5rem"
          height="4.5rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="#f00"
            fillRule="evenodd"
            d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M12.75 8a.75.75 0 0 0-1.5 0v3.25H8a.75.75 0 0 0 0 1.5h3.25V16a.75.75 0 0 0 1.5 0v-3.25H16a.75.75 0 0 0 0-1.5h-3.25z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="#000" strokeWidth="1">
            <path
              strokeLinejoin="round"
              d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            />
            <circle cx="12" cy="7" r="3" />
          </g>
        </svg>
        Profile
      </Link>
    </div>
  );
}
export default Navigation;
