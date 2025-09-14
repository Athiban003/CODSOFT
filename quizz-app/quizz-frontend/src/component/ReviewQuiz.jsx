import { Link, useLocation } from "react-router-dom";

function ReviewQuiz() {
  const location = useLocation();
  const { finalAnswers, questions } = location.state;
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="flex h-[5rem] items-center  px-[1.5rem] bg-white sticky top-0">
        <Link to="/quizzes">
          <p className=" text-[1.6rem]">X</p>
        </Link>
        <h1 className="flex-1 text-center text-[1.6rem] font-bold">
          Review Answer
        </h1>
      </div>

      <div className="px-[1.5rem] overflow-y-scroll h-full w-full">
        {questions.map((q, idx) => (
          <div key={idx} className="mt-[2rem]">
            <h1 className="font-bold text-[1.4rem]">
              <span>{idx + 1}. </span>
              {q.question}
            </h1>

            <div
              className={`text-[1.5rem] border  mt-[1.3rem]  flex flex-col rounded-[5px] px-[1.5rem] py-[1rem] 
            ${
              finalAnswers[idx] === Number(q.correctAnswer)
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
            >
              <p className="flex justify-between mb-[0.5rem] ">
                Your answer : <span>{q.options[finalAnswers[idx]]}</span>
              </p>
              <hr
                className={`border-dotted  ${
                  finalAnswers[idx] === Number(q.correctAnswer)
                    ? " border-green-600"
                    : " border-red-600"
                }`}
              />

              <p className="flex justify-between mt-[.5rem] text-green-600">
                Correct answer :
                <span className="text-green-700">
                  {q.options[Number(q.correctAnswer)]}
                </span>
              </p>
            </div>
          </div>
        ))}

        <Link to="/quizzes">
          <button className="bg-red-500 hover:bg-red-600 text-white text-[1.5rem] p-[.8rem] mt-[3rem] w-full rounded-[7px]">
            Finish
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ReviewQuiz;
