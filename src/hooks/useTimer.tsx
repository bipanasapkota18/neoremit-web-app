import { useEffect, useState } from "react";

export const useTimer = (timeInMinutes: number) => {
  const initialTimeInMinutes = timeInMinutes;
  const [time, setTime] = useState(initialTimeInMinutes * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [time]);

  const restartTimer = () => {
    setTime(initialTimeInMinutes * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return { time, minutes, formattedSeconds, restartTimer };
};
