
import logo from "./icon-192.png";
import React, { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Planner from "./Planner";
import Focus from "./Focus";
import Analytics from "./Analytics";
function App() {
  const [section, setSection] = useState("dashboard");

  return (
    <div>

      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <h1>SMART STUDY HUB</h1>
        <p>PLAN • FOCUS • ACHIEVE</p>
      </header>

      <nav>
        <button onClick={() => setSection("dashboard")}>Dashboard</button>
        <button onClick={() => setSection("planner")}>Planner</button>
        <button onClick={() => setSection("focus")}>Focus</button>
        <button onClick={() => setSection("analytics")}>Analytics</button>
      </nav>

      {section === "dashboard" && <Dashboard />}
      {section === "planner" && <Planner />}
      {section === "focus" && <Focus />}
      {section === "analytics" && <Analytics />}

    </div>
  );
}

export default App;