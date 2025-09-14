import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { finalAnswers, questions } = location.state;
  const [correctAns, setCorrectAns] = useState(0);
  console.log(finalAnswers);

  useEffect(() => {
    let score = 0;
    questions.forEach((element, idx) => {
      if (Number(element.correctAnswer) === finalAnswers[idx]) {
        score++;
      }
    });
    setCorrectAns(score);
  }, [questions, finalAnswers]);

  function handleReview() {
    navigate("/quizzes/result/review", {
      state: { finalAnswers, questions },
    });
  }

  return (
    <div className="bg-gray-100 h-screen ">
      <div className="flex h-[5rem] items-center  px-[1.5rem] bg-white">
        <Link to="/quizzes">
          <p className=" text-[1.6rem]">X</p>
        </Link>
        <h1 className="flex-1 text-center text-[1.6rem] font-bold">
          Quiz Results
        </h1>
      </div>

      <div className="px-[1.5rem]">
        <div className="w-full  h-[17rem] flex items-center justify-center">
          <div className="h-[13rem] w-[13rem] bg-white rounded-full shadow-[0px_0px_4px_7px_rgba(229,231,235,1)] flex items-center justify-center text-center">
            <div>
              <p className="text-[1.4rem] text-gray-500">You Scored</p>
              <p className="font-bold text-[3rem] ">{`${correctAns}/${questions.length}`}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="bg-green-500 h-[10rem] w-[13.5rem] rounded-[1rem] flex items-center justify-center text-[2.5rem] font-bold">
            {correctAns}
          </div>
          <div className="bg-red-500 h-[10rem] w-[13.5rem] rounded-[1rem] flex items-center justify-center text-[2.5rem] font-bold">
            {questions.length - correctAns}
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-full mt-[2rem] h-[3.5rem] rounded-[5px] text-[1.4rem]"
          onClick={handleReview}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}
export default QuizResult;
