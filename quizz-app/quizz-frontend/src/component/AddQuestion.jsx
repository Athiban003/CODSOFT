import { useEffect, useRef, useState } from "react";

function AddQuestion({
  onClose,
  setQuestions,
  selectedQuestion,
  selectedIdx,
  setSelectedIdx,
}) {
  const questionRef = useRef(null);
  const [questionErr, setQuestionErr] = useState(false);

  const [options, setOptions] = useState(["", "", "", ""]);
  const [optionErr, setOptionErr] = useState(false);

  const [selectedOption, setSelectedOption] = useState(-1);
  const [selectedOptionErr, setSelectedOptionErr] = useState(false);

  useEffect(() => {
    if (selectedQuestion && selectedIdx >= 0) {
      if (questionRef.current) {
        questionRef.current.value = selectedQuestion.question;
      }
      setOptions(selectedQuestion.options || ["", "", "", ""]);
      setSelectedOption(selectedQuestion.correctAnswer);
    }
  }, [selectedQuestion, selectedIdx]);

  function handleOptionChange(idx, value) {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  }

  function handleAddQuestion() {
    setQuestionErr(false);
    setOptionErr(false);
    setSelectedOptionErr(false);

    console.log(options, selectedOption);

    const question = questionRef.current.value;
    if (!question || question.length < 10 || question.length > 100) {
      setQuestionErr(true);
      return;
    }

    for (let opt of options) {
      if (opt.length < 1 || opt.length > 100) {
        setOptionErr(true);
        return;
      }
    }

    if (selectedOption < 0) {
      setSelectedOptionErr(true);
      return;
    }

    const questionAns = { question, options, correctAnswer: selectedOption };

    if (selectedIdx >= 0) {
      setQuestions((prev) =>
        prev.map((q, idx) => (idx === selectedIdx ? questionAns : q))
      );
      setSelectedIdx(null);
    } else {
      setQuestions((prev) => [...prev, questionAns]);
      onClose();
    }
  }

  return (
    <div>
      <div
        className="fixed inset-0 flex  bg-black/50"
        onClick={() => (selectedIdx >= 0 ? setSelectedIdx(null) : onClose())}
      ></div>
      <div className="fixed inset-0 h-screen w-screen bg-white px-[1.5rem] pt-[2rem]">
        <div className="flex items-center ">
          <p
            className=" flex-1 text-[2rem] inline"
            onClick={() =>
              selectedIdx >= 0 ? setSelectedIdx(null) : onClose()
            }
          >
            X
          </p>
          <h1 className=" text-[2rem] text-center font-bold">
            {" "}
            {selectedIdx >= 0 ? "Edit Question" : "Add Question"}
          </h1>
          <div className="flex-1"></div>
        </div>

        <textarea
          name="question"
          placeholder="Enter your question "
          className="h-[8rem] w-full mt-[1.5rem] border rounded-[5px] p-[1rem] text-[1.4rem] placeholder:text-[1.5rem]"
          ref={questionRef}
        ></textarea>
        {questionErr && (
          <p className="text-red-600 text-[1.4rem]">
            Character should between 10 and 100
          </p>
        )}

        <h1 className="mt-[2.5rem] text-[2rem] font-bold">Answers</h1>

        <div className="mt-[2rem] flex flex-col gap-[1rem]">
          {options.map((opt, idx) => {
            return (
              <div className="flex gap-[1rem]" key={idx}>
                <input
                  type="radio"
                  name="answer"
                  className="scale-[1.6]"
                  checked={idx === selectedOption}
                  onChange={() => setSelectedOption(idx)}
                />

                <input
                  type="text"
                  className="border h-[4rem] w-full rounded-[5px] text-[1.4rem] placeholder:text-[1.4rem] pl-[1.2rem]"
                  placeholder={`Answer option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        {optionErr && (
          <p className="text-red-600 text-[1.5rem] mt-[1rem]">
            All option should be entered
          </p>
        )}

        {selectedOptionErr && (
          <p className="text-red-600 text-[1.5rem] mt-[1rem]">
            One option should be selected
          </p>
        )}
        <button
          className=" hover:bg-red-50 text-red-500 font-bold border-2 border-red-500 text-[1.6rem] p-[.8rem] mt-[3.5rem] w-full rounded-[7px] transition-all duration-300"
          onClick={handleAddQuestion}
        >
          {selectedIdx >= 0 ? "Update Question" : "Add This Question"}
        </button>
      </div>
    </div>
  );
}
export default AddQuestion;
