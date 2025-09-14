import { useEffect, useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import AddQuestion from "./AddQuestion";
import { Link, useNavigate } from "react-router-dom";

function CreateQuiz() {
  const navigate = useNavigate();

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [questionErr, setQuestionErr] = useState(false);

  const titleRef = useRef(null);
  const [titleErr, setTitleErr] = useState(false);

  const [quizErr, setQuizErr] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestionErr(false);
    }
  }, [questions]);

  async function handleCreateQuiz() {
    setTitleErr(false);
    setQuestionErr(false);
    setQuizErr(false);
    if (!titleRef || titleRef.current?.value.length < 3) {
      setTitleErr(true);
      return;
    }
    if (questions.length <= 0) {
      setQuestionErr(true);
      return;
    }

    const quiz = { title: titleRef.current.value, questions };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/quizzes/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(quiz),
        }
      );
      if (res.ok) {
        console.log("quiz created succesful");
      }
      navigate("/quizzes");
    } catch (err) {
      console.log("problem with creating quiz");
      console.error(err);
      setQuizErr(true);
    }
  }

  return (
    <>
      <div>
        <div className="flex h-[5rem] items-center  px-[1rem]">
          <Link to="/quizzes" className="flex-1">
            <p className=" text-[1.6rem]">X</p>
          </Link>
          <h1 className="flex-1 text-center text-[1.6rem] font-bold">
            Create Quiz
          </h1>
          <div className="flex-1">{/* empty space to balance */}</div>
        </div>

        <div className="h-screen bg-gray-50  w-full  px-[1.5rem]  ">
          <div>
            <input
              type="text"
              placeholder="Quiz Title"
              className="w-full mt-[1rem] h-[5rem] pl-[1rem] rounded-[5px] text-[1.4rem] placeholder:1.4rem border border-gray-300"
              ref={titleRef}
            />
            {titleErr && (
              <p className="text-red-600 text-[1.5rem] mt-[1rem]">
                Title is required min length 3
              </p>
            )}

            <h1 className="text-[1.6rem] font-bold mt-[1.5rem]">Questions</h1>

            {questions.length > 0 && (
              <div className="max-h-[30rem] overflow-y-scroll mt-[1rem]">
                <QuestionCard
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            )}

            {questionErr && (
              <p className="text-red-600 text-[1.5rem] mt-[1rem]">
                Atleast one question required
              </p>
            )}

            <button
              className="b text-[1.5rem] text-gray-500 font-bold p-[.8rem] mt-[3rem] w-full rounded-[7px] border-[2px] border-dashed border-gray-300 hover:bg-[rgb(234,232,232)] bg-clip-padding transition-all duration-300"
              onClick={() => setShowAddQuestion(true)}
            >
              <span>+</span> Add Question
            </button>

            {quizErr && (
              <p className="text-red-600 text-[1.5rem] mt-[1rem]">
                Problem with creating quizz
              </p>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-[1.5rem] p-[.8rem] mt-[2rem] w-full rounded-[7px] transition-all duration-300"
              onClick={handleCreateQuiz}
            >
              Create Quiz
            </button>
          </div>
        </div>

        {showAddQuestion && (
          <AddQuestion
            onClose={() => setShowAddQuestion(false)}
            setQuestions={setQuestions}
          />
        )}
      </div>
    </>
  );
}
export default CreateQuiz;
