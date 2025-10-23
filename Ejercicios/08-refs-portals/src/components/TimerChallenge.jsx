import { useRef, useState, useEffect } from "react";

import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  /* const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false); */

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerRef = useRef(null);
  const dialogRef = useRef(null);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timerRef.current);
    dialogRef.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const onClickButtonHandlerStart = () => {
    /* setTimerExpired(false);
    setTimerStarted(true);

    timerRef.current = setTimeout(() => {
      setTimerExpired(true);
      dialogRef.current.showModal();
    }, 1000 * targetTime); */

    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const onClickButtonHandlerStop = () => {
    /* clearTimeout(timerRef.current);
    setTimerStarted(false); */
    dialogRef.current.open();
    clearInterval(timerRef.current);
  };

  /* useEffect(() => {
    if (timerExpired) {
      setTimerStarted(false);
    }
  }, [timerExpired]); */

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            onClick={
              timerIsActive
                ? onClickButtonHandlerStop
                : onClickButtonHandlerStart
            }
          >
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
