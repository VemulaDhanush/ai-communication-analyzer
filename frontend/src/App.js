import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import PracticeMode from "./PracticeMode";
import InterviewMode from "./InterviewMode";
import History from "./History";
import "./App.css";

function App() {

  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [mode, setMode] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const logout = () => {
    setUser(null);
    setIsLogin(true);
    setMode(null);
    setShowHistory(false);
  };

  /* ---------------- NOT LOGGED IN ---------------- */

  if (!user) {
    return isLogin ? (
      <Login 
        setUser={setUser}
        goToRegister={() => setIsLogin(false)} 
      />
    ) : (
      <Register 
        goToLogin={() => setIsLogin(true)} 
      />
    );
  }

  /* ---------------- HISTORY ---------------- */

  if (showHistory) {
    return (
      <History
        user={user}
        goBack={() => setShowHistory(false)}
      />
    );
  }

  /* ---------------- PRACTICE MODE ---------------- */

  if (mode === "practice") {
    return (
      <PracticeMode
        user={user}
        goBack={() => setMode(null)}
      />
    );
  }

  /* ---------------- INTERVIEW MODE ---------------- */

  if (mode === "interview") {
    return (
      <InterviewMode
        user={user}
        goBack={() => setMode(null)}
      />
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <Dashboard
      user={user}
      setMode={setMode}
      showHistory={() => setShowHistory(true)}
      logout={logout}
    />
  );
}

export default App;