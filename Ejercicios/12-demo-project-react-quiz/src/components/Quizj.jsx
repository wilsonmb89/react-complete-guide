import { useCallback, useState } from "react";

import QuestionTimer from "./QuestionTimer";

import quizCompleteIcon from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import Answers from "./Answers";

const ANSWER_REMAINING_TIME = 10000;

export default function Quiz() {
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteIcon} alt="Quiz complete icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      
    </div>
  );
}
