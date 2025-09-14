import { useState } from "react";
import AddQuestion from "./AddQuestion";

function QuestionCard({ setQuestions, questions }) {
  console.log(questions);
  const [selectedIdx, setSelectedIdx] = useState(null);

  function handleEdit(idx) {
    setSelectedIdx(idx);
    console.log(questions[idx]);
  }

  return (
    <>
      {questions &&
        questions.map((_, idx) => {
          return (
            <div
              className="h-[7rem] bg-white py-[2rem] px-[1rem] justify-between items-center flex rounded-[7px] gap-[1rem] first:mt-[2rem] mt-[1rem]"
              onClick={() => handleEdit(idx)}
              key={idx}
            >
              <div className="flex items-center gap-[1rem]   flex-1 w-[70%]">
                <div className="w-[70%]">
                  <p className="font-bold text-[1.5rem]  truncate">
                    {`Question ${idx + 1}`}
                  </p>
                  <p className="text-gray-400 text-[1.4rem]">Multiple Choice</p>
                </div>
              </div>

              <button className="text-[1.6rem] mr-[.5rem]">&gt;</button>
            </div>
          );
        })}
      {selectedIdx !== null && (
        <AddQuestion
          selectedQuestion={questions[selectedIdx]}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          setQuestions={setQuestions}
        />
      )}
    </>
  );
}
export default QuestionCard;
