import { useRef, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (seconds <= 0) return;

    setRunning(true);

    timerRef.current = setInterval(() => {
      setTimeCount((prev) => {
        if (prev + 1 >= seconds) {
          clearInterval(timerRef.current);
          setRunning(false);
          return seconds;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setTimeCount(timeCount);
    setRunning(false);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>React Timer</h2>

      <label htmlFor="seconds-input">Enter Seconds: </label>
      <input
        id="seconds-input"
        type="number"
        min="1"
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
        disabled={running}
      />

      <div style={{ margin: "10px" }}>
        <button id="start" onClick={handleStart} disabled={running}>
          Start
        </button>
        <button id="stop" onClick={handleStop} disabled={!running}>
          Stop
        </button>
      </div>

      <div id="timer" style={{ fontSize: "20px", fontWeight: "bold" }}>
        Timer: {timeCount}s
      </div>
    </div>
  );
}
