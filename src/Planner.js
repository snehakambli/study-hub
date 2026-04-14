import React, { useState, useEffect } from "react";

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  function addTask() {
    if (!input) return;
    let newTasks = [...tasks, { text: input, done: false }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setInput("");
  }

  function toggleTask(i) {
    let updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  return (
    <section>
      <h2>Planner</h2>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t, i) => (
          <li
            key={i}
            onClick={() => toggleTask(i)}
            style={{ textDecoration: t.done ? "line-through" : "none" }}
          >
            {t.text}
          </li>
        ))}
      </ul>
    </section>
  );
}