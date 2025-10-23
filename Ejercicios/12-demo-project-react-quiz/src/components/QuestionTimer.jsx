import { useEffect, useState } from "react";

export default function ProgressName({ onTimeout, maxTimeoutValue }) {
  const [remainingTime, setRemainingTime] = useState(maxTimeoutValue);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const timerTimeout = setTimeout(onTimeout, maxTimeoutValue);

    return () => {
      clearTimeout(timerTimeout);
    };
  }, [maxTimeoutValue, onTimeout]);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={maxTimeoutValue}
    ></progress>
  );
}
