import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function PlayQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state;
  console.log(quiz);

  const [page, setPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const [err, setErr] = useState(false);

  const questions = quiz.quiz.questions;

  function handleNext() {
    console.log(selectedOption);

    if (selectedOption === null) {
      setErr(true);
      return;
    }
    setSelectedAnswers((prev) => [...prev, selectedOption]);
    setPage((prev) => prev + 1);
    setSelectedOption(null);
    setErr(false);
  }

  function handleSubmit() {
    if (selectedOption === null) {
      setErr(true);
      return;
    }
    const finalAnswers = [...selectedAnswers, selectedOption];
    navigate("/quizzes/result", {
      state: { finalAnswers, questions },
    });
  }

  return (
    <div className="px-[1.5rem]">
      <div className="flex h-[5rem] items-center  ">
        <Link to="/quizzes">
          <p className=" text-[1.6rem]">X</p>
        </Link>
        <h1 className="flex-1 text-center text-[1.6rem] font-bold">Quiz</h1>
      </div>

      {page < questions.length && (
        <div>
          <p className="text-[1.4rem]">
            Question {page + 1}/{questions.length}
          </p>
          <h1 className="text-[1.6rem] font-bold mt-[2rem]">
            {questions[page].question}
          </h1>

          <div className="mt-[2rem] flex flex-col gap-[1rem]">
            {[0, 1, 2, 3].map((e) => (
              <label key={e} htmlFor={`option-${e}`}>
                <div
                  className={`flex gap-[1rem] border-2 border-gray-100 h-[4.5rem] rounded-[7px] items-center pl-[1.2rem] ${
                    selectedOption === e ? "bg-red-50 border-red-600" : "k"
                  }`}
                >
                  <input
                    type="radio"
                    name={`answer-${page}`}
                    id={`option-${e}`}
                    className="scale-[1.4]"
                    checked={selectedOption === e}
                    onChange={() => setSelectedOption(e)}
                  />
                  <p className="text-[1.5rem]">{questions[page].options[e]}</p>
                </div>
              </label>
            ))}
          </div>
          {err && (
            <p className="text-red-500 text-[1.4rem]">Select any one option</p>
          )}
          <button
            className="bg-red-500 w-full text-white text-[1.5rem] h-[3.5rem] rounded-[5px] mt-[45%]"
            onClick={page === questions.length - 1 ? handleSubmit : handleNext}
          >
            {page === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
export default PlayQuiz;
