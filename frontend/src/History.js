import { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";

function History({ user, goBack }) {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch(`https://communication-backend-wvkm.onrender.com/api/history/${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("History Data:", data);
        setHistory(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching history", err);
        setHistory([]);
        setLoading(false);
      });
  }, [user.email]);

  const totalAttempts = history.length;

  const averageScore =
    totalAttempts > 0
      ? (
          history.reduce((sum, item) => sum + (item.score || 0), 0) /
          totalAttempts
        ).toFixed(0)
      : 0;

  return (
    <div className="history-container">

      <div className="history-header">
        <h2>📊 Your Performance History</h2>
        <button className="back-btn" onClick={goBack}>⬅ Back</button>
      </div>

      {loading ? (
        <p style={{ marginTop: "40px" }}>Loading...</p>
      ) : totalAttempts === 0 ? (
        <div className="empty-history">
          <h3>No attempts yet</h3>
          <p>Start practicing to see your progress.</p>
        </div>
      ) : (
        <>
          {/* Average Card */}
          <div className="avg-score-card">
            <h3>Average Score</h3>
            <h1>{averageScore}%</h1>
            <p>Total Attempts: {totalAttempts}</p>
          </div>

          {/* Score Graph */}
          <div className="chart-container">
            <ScoreChart history={history} />
          </div>

          {/* History Cards */}
          <div className="history-grid">
            {history.map((item, index) => (
              <div key={index} className="history-card">
                <div className="score-circle">
                  {item.score ?? 0}%
                </div>

                <div className="history-details">
                  <p><strong>Mode:</strong> {item.mode}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default History;