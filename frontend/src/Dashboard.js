import { useEffect, useState } from "react";

function Dashboard({ user, setMode, showHistory, logout }) {

  const [history, setHistory] = useState([]);

  useEffect(() => {
fetch(`https://communication-backend-wvkm.onrender.com/api/history/${user.email}`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.log("Error fetching dashboard data"));
  }, [user.email]);

  const totalAttempts = history.length;

  const averageScore =
    totalAttempts > 0
      ? (
          history.reduce((sum, item) => sum + (item.score || 0), 0) /
          totalAttempts
        ).toFixed(0)
      : 0;

  const calculateLevel = (score) => {
    if (score >= 85) return "Expert";
    if (score >= 70) return "Advanced";
    if (score >= 50) return "Intermediate";
    return "Beginner";
  };

  const level = calculateLevel(Number(averageScore));

  return (
    <div className="dashboard-container">

      {/* TOP SECTION */}
      <div className="top-section">
        <div>
          <h1 className="welcome-title">Welcome, {user.name} 👋</h1>
          <p className="subtitle">
            Track your communication improvement journey.
          </p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS SECTION */}
      <div className="stats-section">

        <div className="stat-card attempts">
          <h2>{totalAttempts}</h2>
          <p>Total Attempts</p>
        </div>

        <div className="stat-card average">
          <h2>{averageScore}%</h2>
          <p>Average Score</p>
        </div>

        <div className="stat-card level">
          <h2>{level}</h2>
          <p>Current Level</p>
        </div>

      </div>

      {/* MODES SECTION */}
      <div className="modes-section">

        <div
          className="mode-card practice"
          onClick={() => setMode("practice")}
        >
          <h2>📝 Practice Mode</h2>
          <p>
            Improve your grammar, structure and confidence with AI feedback.
          </p>
        </div>

        <div
          className="mode-card interview"
          onClick={() => setMode("interview")}
        >
          <h2>🎯 Interview Mode</h2>
          <p>
            Simulate real interview scenarios with timer and pressure.
          </p>
        </div>

      </div>

      {/* HISTORY BUTTON */}
      <div style={{ marginTop: "50px" }}>
        <button className="history-btn" onClick={showHistory}>
          📊 View Detailed History
        </button>
      </div>

    </div>
  );
}

export default Dashboard;