import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [daysLeft, setDaysLeft] = useState("");
  const [tasks, setTasks] = useState([]);
  const [goal, setGoal] = useState(3); // default 3 tasks
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);

  // LOAD TASKS
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);

    let done = saved.filter(t => t.done).length;
    setCompleted(done);
  }, []);

  // EXAM COUNTDOWN
  useEffect(() => {
    const interval = setInterval(() => {
      let examDate = localStorage.getItem("examDate");
      if (!examDate) return;

      let diff = Math.floor((new Date(examDate) - new Date()) / (1000*60*60*24));
      setDaysLeft(diff + " days left");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // STREAK (simple logic)
  useEffect(() => {
    let savedStreak = localStorage.getItem("streak") || 0;
    setStreak(savedStreak);
  }, []);

  function setExam(e) {
    localStorage.setItem("examDate", e.target.value);
  }

  // SMART SUGGESTION
  function getSuggestion() {
    let pending = tasks.filter(t => !t.done);
    if (pending.length === 0) return "You're all caught up 🎉";
    return "Start with: " + pending[0].text;
  }

  let progress = Math.min((completed / goal) * 100, 100);

  return (
    <section>
      <h2>Dashboard</h2>

      {/* STUDY GOAL */}
      <h3>Daily Goal</h3>
      <p>{completed} / {goal} tasks completed</p>
      <div style={{background:"#ddd", borderRadius:"10px"}}>
        <div style={{
          width: progress + "%",
          background:"#a67c52",
          height:"10px",
          borderRadius:"10px"
        }}></div>
      </div>

      {/* STREAK */}
      <h3>🔥 Study Streak</h3>
      <p>{streak} days</p>

      {/* TODAY TASKS */}
      <h3>Today’s Tasks</h3>
      <ul>
        {tasks.slice(0,3).map((t,i)=>(
          <li key={i}>{t.text}</li>
        ))}
      </ul>

      {/* SMART SUGGESTION */}
      <h3>💡 Suggestion</h3>
      <p>{getSuggestion()}</p>

      {/* EXAM COUNTDOWN */}
      <h3>⏳ Exam Countdown</h3>
      <input type="date" onChange={setExam}/>
      <p>{daysLeft}</p>

    </section>
  );
}