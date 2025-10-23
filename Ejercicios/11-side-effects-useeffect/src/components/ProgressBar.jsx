import { useEffect, useState } from "react";

export default function ProgressBar({ maxTime = 3000 }) {
  const [remainingTime, setRemainingTime] = useState(maxTime);
  
    useEffect(() => {
      const timeoutInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 10);
      }, 10);
  
      return () => {
        clearInterval(timeoutInterval);
      };
    }, []);

  return (
    <progress value={remainingTime} max={maxTime} />
  );
};
