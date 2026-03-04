import { useState, useEffect, useCallback } from "react";
import "./App.css";

function InterviewMode({ user, goBack }) {
  const hrQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths?",
  "What are your weaknesses?",
  "Where do you see yourself in 5 years?",
  "Describe a challenging situation you faced.",
  "How do you handle stress?",
  "What motivates you?",
  "Why do you want to join our company?",
  "Describe a failure and what you learned.",
  "Are you a team player?",
  "How do you handle criticism?",
  "Describe your leadership style.",
  "What is your biggest achievement?",
  "How do you prioritize your work?",
  "What makes you unique?",
  "Why should we not hire you?",
  "What are your long-term goals?",
  "How do you deal with deadlines?",
  "Tell me about a time you solved a problem.",
  "How do you handle pressure?",
  "Describe a conflict you resolved.",
  "What motivates you at work?",
  "How do you improve yourself?",
  "What are your salary expectations?",
  "What do you know about our company?",
  "Why are you leaving your current role?",
  "Describe a situation where you showed leadership.",
  "How do you manage time effectively?",
  "Tell me about a time you failed.",
  "How do you handle feedback?",
  "Describe your ideal work environment.",
  "How do you stay updated with industry trends?",
  "Have you ever disagreed with a manager?",
  "How do you manage multiple tasks?",
  "What are your career aspirations?",
  "Why did you choose this field?",
  "How do you define success?",
  "Tell me about a difficult decision you made.",
  "What is your greatest professional accomplishment?",
  "How do you handle workplace conflicts?",
  "What do you expect from this role?",
  "What are your hobbies outside work?",
  "Describe a time you worked under pressure.",
  "How do you ensure quality in your work?"
];
const englishQuestions = [
  "Introduce yourself in English.",
  "Describe your hometown.",
  "Explain your final year project.",
  "Talk about your goals.",
  "Describe your college life.",
  "Talk about your role model.",
  "Describe a memorable day.",
  "Explain why communication is important.",
  "Talk about your daily routine.",
  "Describe your strengths in English.",
  "What is your favorite hobby and why?",
  "Describe your best friend.",
  "Talk about a book that inspired you.",
  "Describe your favorite movie.",
  "Explain the importance of teamwork.",
  "Talk about your dream job.",
  "Describe a festival in your hometown.",
  "Talk about your family.",
  "Describe a challenge you overcame.",
  "Explain why learning English is important.",
  "Describe a teacher who inspired you.",
  "Talk about a recent news event.",
  "Describe a place you want to visit.",
  "Explain your career plan.",
  "Talk about your favorite subject.",
  "Describe your daily schedule.",
  "Talk about the importance of technology.",
  "Describe your favorite sport.",
  "Explain how to stay healthy.",
  "Talk about time management.",
  "Describe your first day at college.",
  "Talk about your leadership experience.",
  "Describe your biggest achievement.",
  "Explain the importance of confidence.",
  "Talk about online learning.",
  "Describe a problem you solved.",
  "Talk about your communication skills.",
  "Describe a difficult situation.",
  "Explain why goals are important.",
  "Talk about your strengths and weaknesses.",
  "Describe a successful person you admire.",
  "Talk about climate change.",
  "Describe social media impact.",
  "Explain importance of discipline.",
  "Talk about self-improvement.",
  "Describe your future plans.",
  "Talk about public speaking.",
  "Describe a skill you want to learn.",
  "Explain importance of hard work.",
  "Talk about your internship experience."
];

  const [round, setRound] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [listening, setListening] = useState(false);

  const [results, setResults] = useState([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [finalAnalysis, setFinalAnalysis] = useState(null);

  /* ================= START MOCK ================= */
  const startMock = (count) => {
  const source = round === "hr" ? hrQuestions : englishQuestions;

  let expandedQuestions = [...source];

  // If requested count is more than available questions
  while (expandedQuestions.length < count) {
    expandedQuestions = [...expandedQuestions, ...source];
  }

  const shuffled = expandedQuestions.sort(() => 0.5 - Math.random());

  setQuestions(shuffled.slice(0, count));
  setSelectedCount(count);
  setCurrentIndex(0);
  setResults([]);
  setFinalAnalysis(null);
  setInterviewCompleted(false);
  setText("");
  setTimeLeft(60);
  setIsActive(true);
};
  /* ================= SUBMIT ANSWER ================= */
  /* ================= SUBMIT ANSWER (FIXED) ================= */
const submitAnswer = useCallback(async (isSkip = false) => {
  // 1. Check if the user clicked "Next" with an empty text area
  const effectivelySkipped = isSkip || text.trim() === "";

  try {
    // Default "Zero" data for skipped/empty answers
    let data = { 
      overall_score: 0,
      length_score: 0,
      structure_score: 0,
      grammar_score: 0,
      grammar_errors: 0,
      filler_penalty: 0,
      suggestions: ["No answer provided or question skipped."]
    };

    // 2. Only call API if it's NOT skipped and NOT empty
    if (!effectivelySkipped) {
      const response = await fetch("https://communication-backend-wvkm.onrender.com/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          mode: "interview",
          category: round,
          name: user?.name,
          email: user?.email
        })
      });
      
      if (response.ok) {
        data = await response.json();
      }
    }

    // Update results with either API data or Zero data
    setResults(prev => [...prev, data]);
    setText("");

    // Move to next question or complete
    if (currentIndex + 1 < selectedCount) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(60);
    } else {
      setIsActive(false);
      setInterviewCompleted(true);
    }
  } catch (err) {
    console.error("API Error:", err);
    // Even if API fails, move forward with 0 score
    setResults(prev => [...prev, { overall_score: 0 }]);
    if (currentIndex + 1 < selectedCount) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(60);
    } else {
      setIsActive(false);
      setInterviewCompleted(true);
    }
  }
}, [text, currentIndex, selectedCount, round, user]);

  /* ================= TIMER ================= */
/* ================= TIMER FIXED ================= */
useEffect(() => {

  if (!isActive) return;

  if (timeLeft === 0) {
    submitAnswer(false);
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);

}, [isActive, timeLeft, submitAnswer]);

  /* ================= FINAL ANALYZE ================= */
 const analyzeInterview = () => {
  if (results.length === 0) return;

  const total = results.length;

  const totals = results.reduce((acc, r) => ({
    overall: acc.overall + (r.overall_score || 0),
    length: acc.length + (r.length_score || 0),
    structure: acc.structure + (r.structure_score || 0),
    grammar: acc.grammar + (r.grammar_score || 0),
    errors: acc.errors + (r.grammar_errors || 0),
    fillers: acc.fillers + (r.filler_penalty || 0),
    vocab: acc.vocab + (r.vocabulary_score || 0),
    repetition: acc.repetition + (r.repetition_penalty || 0),
    sentiments: [...acc.sentiments, r.sentiment],
    suggs: [...acc.suggs, ...(r.suggestions || [])]
  }), {
    overall: 0,
    length: 0,
    structure: 0,
    grammar: 0,
    errors: 0,
    fillers: 0,
    vocab: 0,
    repetition: 0,
    sentiments: [],
    suggs: []
  });

  const avgScore = (totals.overall / total).toFixed(0);

  const level =
    avgScore >= 85 ? "Expert" :
    avgScore >= 70 ? "Advanced" :
    avgScore >= 50 ? "Intermediate" :
    "Beginner";

  // Most common sentiment
  const sentimentCount = {};
  totals.sentiments.forEach(s => {
    if (!s) return;
    sentimentCount[s] = (sentimentCount[s] || 0) + 1;
  });

  const dominantSentiment =
    Object.keys(sentimentCount).reduce((a, b) =>
      sentimentCount[a] > sentimentCount[b] ? a : b,
      "Neutral"
    );

  setFinalAnalysis({
    overall_score: avgScore,
    level,
    confidence: avgScore > 70 ? "High" : avgScore > 50 ? "Medium" : "Low",
    length_score: (totals.length / total).toFixed(1),
    structure_score: (totals.structure / total).toFixed(1),
    grammar_score: (totals.grammar / total).toFixed(1),
    grammar_errors: totals.errors,
    filler_penalty: totals.fillers,
    vocabulary_score: (totals.vocab / total).toFixed(1),
    repetition_penalty: totals.repetition,
    sentiment: dominantSentiment,
    suggestions: [...new Set(totals.suggs)]
  });
};
  /* ================= VOICE ================= */
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
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
    <div className="interview-theme">
      <div className="practice-header">
        <h2>🎯 {round ? `${round.toUpperCase()} ROUND` : "Interview Mode"}</h2>
        <button className="back-btn" onClick={goBack}>⬅ Back</button>
      </div>

      {!round && (
        <div className="big-selection-container">
          <div className="selection-card hr" onClick={() => setRound("hr")}>👔 HR Round</div>
          <div className="selection-card english" onClick={() => setRound("english")}>📝 English Round</div>
        </div>
      )}

      {round && !selectedCount && (
        <div className="count-selection-screen">
          <h3>Select Question Count</h3>
          <div className="count-btns">
            {[5, 15, 25, 70].map(num => (
              <button key={num} className="count-btn" onClick={() => startMock(num)}>{num} Questions</button>
            ))}
          </div>
        </div>
      )}

      {isActive && questions.length > 0 && (
        <div className="interview-card">
          <div className="interview-status">
            <span>Question {currentIndex + 1} / {selectedCount}</span>
            <span className={`timer-badge ${timeLeft < 10 ? "alert" : ""}`}>⏳ {timeLeft}s</span>
          </div>
          <div className="q-box">{questions[currentIndex]}</div>
          <textarea
            className="answer-input"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your answer..."
          />
          <div className="interview-actions">
            <button onClick={startVoiceRecognition} className={`mic-button ${listening ? "pulse" : ""}`}>
              {listening ? "🎤 Listening..." : "🎤 Speak"}
            </button>
            <div className="right-group">
              <button onClick={() => submitAnswer(true)} className="skip-btn">⏭ Skip</button>
              <button onClick={() => submitAnswer(false)} className="submit-btn">Next</button>
            </div>
          </div>
        </div>
      )}

      {interviewCompleted && !finalAnalysis && (
        <div className="result-card-final">
          <h2>Interview Completed 🎉</h2>
          <button className="restart-btn" onClick={analyzeInterview}>📊 Analyze Interview</button>
        </div>
      )}

      {finalAnalysis && (
  <div className="result-card-pro">

    <div className="score-header">
      <div className="score-circle">
        <span>{finalAnalysis.overall_score}%</span>
      </div>

      <div className="score-info">
        <h2>{finalAnalysis.level}</h2>
        <p>Confidence: {finalAnalysis.confidence}</p>
      </div>
    </div>

    <div className="metrics-grid">
      <div className="metric-box">
        <h4>Length</h4>
        <p>{finalAnalysis.length_score}</p>
      </div>

      <div className="metric-box">
        <h4>Structure</h4>
        <p>{finalAnalysis.structure_score}</p>
      </div>

      <div className="metric-box">
        <h4>Grammar</h4>
        <p>{finalAnalysis.grammar_score}</p>
      </div>

      <div className="metric-box">
        <h4>Errors</h4>
        <p>{finalAnalysis.grammar_errors}</p>
      </div>
    </div>

    <div className="advanced-ai">
      <h3>🧠 Advanced AI Analysis</h3>
      <p>Sentiment: <span className="sentiment">{finalAnalysis.sentiment}</span></p>
      <p>Vocabulary Score: {finalAnalysis.vocabulary_score} / 10</p>
      <p>Repetition Penalty: {finalAnalysis.repetition_penalty}</p>
    </div>

    <div className="suggestions-box">
      <h3>Suggestions</h3>
      <ul>
        {finalAnalysis.suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>

  </div>
)}
    </div>
  );
}

export default InterviewMode;
