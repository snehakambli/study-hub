import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  let completed = tasks.filter(t => t.done).length;
  let pending = tasks.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
        backgroundColor: ["#a67c52", "#d9c2a8"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <section>
      <h2>Analytics</h2>

      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <Bar data={data} options={options} />
      </div>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Completed: {completed} | Pending: {pending}
      </p>
    </section>
  );
}