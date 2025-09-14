import { useNavigate } from "react-router-dom";
import { anime } from "../assets";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="h-[8rem] bg-white py-[2rem] px-[1rem] justify-between items-center flex rounded-[7px] gap-[1rem] cursor-pointer"
        onClick={() => navigate(`/quizzes/${quiz._id}`, { state: quiz })}
      >
        <div className="flex items-center gap-[1rem]   flex-1 w-[70%]">
          <div className="w-[100%]">
            <p className="font-bold text-[1.4rem]  truncate">
              {quiz.quiz.title}
            </p>
            <p className="text-gray-400 text-[1.3rem]">by {quiz.userId.name}</p>
          </div>
        </div>

        <button className="text-[1.6rem] mr-[.5rem]">&gt;</button>
      </div>
    </>
  );
}
export default QuizCard;
