import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

export default function Question({ text, answers, onSelectAnswer }) {
  return (
    <div id="question">
      <QuestionTimer
        key={`question-timer-${activeQuestionIndex}`}
        onTimeout={handleOnTimeout}
        maxTimeoutValue={ANSWER_REMAINING_TIME}
      />
      <h2>{text}</h2>
      <Answers
        key={`answers-${activeQuestionIndex}`}
        answers={answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelectAnswer={handleOnClickAnswerButton}
      />
    </div>
  );
}
