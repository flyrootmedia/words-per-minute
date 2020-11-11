import '../sass/timer.scss';

import React, { useRef, useState, useEffect } from 'react';

interface TimerProps {
  timerShouldRun: boolean;
  time: number; // must be passed in total number of seconds
  onCountdownComplete: Function;
}

interface TimerElement extends HTMLDivElement {
  isRunning: boolean;
  countDown: NodeJS.Timeout;
}

const getTimeString = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeString = `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;

  return timeString;
}

export const Timer = ({ timerShouldRun, time, onCountdownComplete }: TimerProps): JSX.Element => {
  const [timerText, setTimerText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const timerEl = useRef<TimerElement>(null);

  useEffect(() => {
    
    const initialTimeString = getTimeString(time);

    if (timerShouldRun) {
      if (timerEl?.current && !timerEl.current.isRunning) {
        setIsComplete(false);
        timerEl.current.isRunning = true;
        let secondsRemaining = time;

        timerEl.current.countDown = setInterval(() => {
          if (secondsRemaining > 0) {
            secondsRemaining--;
            const newTimeString = getTimeString(secondsRemaining);
            setTimerText(newTimeString);
          } else {
            setIsComplete(true);
            onCountdownComplete();

            if (timerEl?.current) {
              clearInterval(timerEl.current.countDown);
            }
          }
        }, 1000);
      }
    } else {
      if (timerEl?.current) {
        timerEl.current.isRunning = false;
        setIsComplete(false);
        clearInterval(timerEl.current.countDown);
        setTimerText(initialTimeString);
      }
    }
  }, [timerShouldRun, time, onCountdownComplete]);

  return (
    <div ref={timerEl} className={`timer ${isComplete ? '-complete' : ''}`}>{timerText}</div>
  );
};