import React, { useState, useEffect } from "react";

export default function Focus() {
  const [time, setTime] = useState(1500); // 25 min
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // focus or break

  // TIMER LOGIC
  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  // FORMAT TIME
  function getMinutes() {
    return Math.floor(time / 60);
  }

  function getSeconds() {
    return time % 60 < 10 ? "0" + (time % 60) : time % 60;
  }

  // MODE SWITCH
  function startFocus() {
    setMode("focus");
    setTime(1500); // 25 min
    setRunning(false);
  }

  function startBreak() {
    setMode("break");
    setTime(300); // 5 min
    setRunning(false);
  }

  function resetTimer() {
    if (mode === "focus") setTime(1500);
    else setTime(300);
    setRunning(false);
  }

  // AUDIO
  function playSound(id) {
    document.getElementById(id).play();
  }

  function stopSounds() {
    document.querySelectorAll("audio").forEach(a => {
      a.pause();
      a.currentTime = 0;
    });
  }

  return (
    <section>
      <h2>Focus Mode</h2>

      {/* MODE SWITCH */}
      <div style={{ textAlign: "center" }}>
        <button onClick={startFocus}>🍅 Focus</button>
        <button onClick={startBreak}>☕ Break</button>
      </div>

      {/* FLIP TIMER */}
      <div className="flip-timer">
        <div className="time-box">{getMinutes()}</div>
        <div className="colon">:</div>
        <div className="time-box">{getSeconds()}</div>
      </div>

      {/* CONTROLS */}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setRunning(true)}>▶ Start</button>
        <button onClick={() => setRunning(false)}>⏸ Pause</button>
        <button onClick={resetTimer}>🔄 Reset</button>

        <p>{mode === "focus" ? "Focus Time" : "Break Time"}</p>
      </div>


      {/* SOUNDS */}
      <h3>Ambient Sounds</h3>

      <div className="sound-grid">
  <button onClick={() => playSound("rain")}>🌧 Rain</button>
  <button onClick={() => playSound("ocean")}>🌊 Ocean</button>

  <button onClick={() => playSound("night")}>🌙 Night</button>
  <button onClick={() => playSound("stream")}>🌿 Stream</button>

  <button onClick={() => playSound("fire")}>🔥 Fire</button>
  <button onClick={stopSounds}>⛔ Stop</button>
</div>

      <audio id="rain" src="rain.wav" loop />
      <audio id="ocean" src="ocean.mp3" loop />
      <audio id="night" src="night.mp3" loop />
      <audio id="stream" src="stream.mp3" loop />
      <audio id="fire" src="fire.mp3" loop />

    </section>
  );
}