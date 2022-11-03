import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getQuestion, questions } from "./data/questions";
import {
  answerOrEditQuestion,
  selectQuestion,
} from "./redux/slices/questionSlice";
import { useAppSelector } from "./redux/store";

type StarProps = {
  filled: boolean;
};

const Star = (props: StarProps) => {
  return props.filled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#AEBDCA"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-[#AEBDCA]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-[#AEBDCA]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
};
type Props = {};

const Question = (props: Props) => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const questionIdInt = Number.parseInt(questionId!!);
  const question = getQuestion(questionIdInt);

  const answer = useAppSelector(selectQuestion);
  console.log(answer, questionId);
  const dispatch = useDispatch();
  const existingAnswer = answer.at(questionIdInt - 1);

  const [stars, setStars] = useState<number>(
    existingAnswer ? existingAnswer.answer : 0
  );

  useEffect(() => {
    const found = answer.at(questionIdInt - 1);
    if (found) {
      setStars(found.answer);
    }
  }, [questionIdInt, answer]);

  const questionSwitch = (question: number) => {
    dispatch(
      answerOrEditQuestion({
        questionNumber: questionIdInt,
        answer: stars,
      })
    );

    if (question > questions.length) {
      navigate("/question/finished");
    } else {
      navigate("/question/" + question);
      setStars(0);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#AEBDCA]">
      <div className="bg-[#F5EFE6] w-[27.5vw] h-[30vh] flex flex-col justify-center rounded-lg">
        <div className="flex flex-col gap-3 max-w-[80%] mx-auto">
          <h1 className="text-xl font-bold">Question {questionId}</h1>
          <div>
            <p className="text-left">
              {question}
              <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-2">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <button
                    className={`py-2 px-5 rounded-lg transition-colors duration-500 text-white ${
                      index < stars ? "bg-[#7895B2]" : "bg-[#AEBDCA]"
                    }`}
                    onClick={() =>
                      setStars((stars) => (stars - 1 === index ? 0 : index + 1))
                    }
                  >
                    <span>{Math.floor(index + 1)}</span>
                  </button>
                ))}
            </div>
            <div className="flex w-full justify-between">
              <p className="text-xs opacity-50">Not satisfied</p>
              <p className="text-xs opacity-50">Very satisfied</p>
            </div>
            <div className="flex justify-between space-x-5">
              <button
                disabled={questionIdInt === 1}
                onClick={() => questionSwitch(questionIdInt - 1)}
                className="w-full bg-[#AEBDCA] py-2 text-white rounded-lg"
              >
                Previous
              </button>
              <button
                disabled={stars === 0}
                onClick={() => questionSwitch(questionIdInt + 1)}
                className="w-full bg-[#7895B2] py-2 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
