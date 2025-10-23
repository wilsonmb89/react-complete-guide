import quizAppLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={quizAppLogo} alt="Quiz logo" />
      <h1>React Quiz</h1>
    </header>
  );
}
