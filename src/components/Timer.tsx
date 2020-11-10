import React, { useRef, useState, useEffect } from 'react';

interface TimerProps {
  timerShouldRun: boolean;
  onCountdownComplete: Function;
}

interface TimerElement extends HTMLDivElement {
  isRunning: boolean;
  countDown: NodeJS.Timeout;
}

export const Timer = ({ timerShouldRun, onCountdownComplete }: TimerProps): JSX.Element => {
  const [timerText, setTimerText] = useState('1:00');
  const timerEl = useRef<TimerElement>(null);

  useEffect(() => {
    if (timerShouldRun) {
      if (timerEl?.current && !timerEl.current.isRunning) {
        timerEl.current.isRunning = true;

        let secondsRemaining = 60;

        timerEl.current.countDown = setInterval(() => {
          if (secondsRemaining > 0) {
            secondsRemaining--;
            const timeString = secondsRemaining < 10 ? `0:0${secondsRemaining}` : `0:${secondsRemaining}`;
            setTimerText(timeString);
          } else {
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
        clearInterval(timerEl.current.countDown);
        setTimerText('1:00');
      }
    }
  }, [timerShouldRun, onCountdownComplete]);

  return (
    <div ref={timerEl} className="timer">{timerText}</div>
  );
};