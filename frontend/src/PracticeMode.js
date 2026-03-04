import { useState } from "react";

function PracticeMode({ user, goBack }) {

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);

  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const analyzeText = async () => {
    if (!text.trim()) return;

    const response = await fetch("https://communication-backend-wvkm.onrender.com/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        name: user.name,
        email: user.email,
        mode: "practice"
      })
    });

    const data = await response.json();
    setResult(data);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(prev => prev + (prev ? " " : "") + transcript);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="practice-container">

      <div className="practice-header">
        <h2>📝 Practice Mode</h2>
        <button className="back-btn" onClick={goBack}>
          ⬅ Back
        </button>
      </div>

      <textarea
        placeholder="Type or speak your answer here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        className="practice-textarea"
      />

      <div className="practice-actions">
        <span>Words: {wordCount}</span>

        <button
          onClick={startVoiceRecognition}
          className={`voice-btn ${listening ? "listening" : ""}`}
        >
          🎤 {listening ? "Listening..." : "Speak"}
        </button>

        <button onClick={analyzeText} className="analyze-btn">
          Analyze
        </button>
      </div>

      {/* ✅ Proper Conditional Rendering */}
      {result && (
        <div className="result-card-pro">

          <div className="score-header">
            <div className="score-circle">
              {result.overall_score}%
            </div>

            <div>
              <h2>{result.level}</h2>
              <p><strong>Confidence:</strong> {result.confidence}</p>
            </div>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <div className="metrics-grid">
            <div className="metric-box">
              <h4>Length Score</h4>
              <p>{result.length_score}</p>
            </div>

            <div className="metric-box">
              <h4>Structure Score</h4>
              <p>{result.structure_score}</p>
            </div>

            <div className="metric-box">
              <h4>Grammar Score</h4>
              <p>{result.grammar_score}</p>
            </div>

            <div className="metric-box">
              <h4>Errors</h4>
              <p>{result.grammar_errors}</p>
            </div>
          </div>

          <div className="advanced-ai">
            <h3>🧠 Advanced AI Analysis</h3>
            <p>Sentiment: {result.sentiment}</p>
            <p>Vocabulary Score: {result.vocabulary_score} / 10</p>
            <p>Repetition Penalty: {result.repetition_penalty}</p>
          </div>

          <div className="suggestions">
            <h3>Suggestions</h3>
            <ul>
              {result.suggestions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}

export default PracticeMode;