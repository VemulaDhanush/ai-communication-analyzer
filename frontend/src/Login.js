import { useState } from "react";

function Login({ setUser, goToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  // 🔴 Basic Validation
  if (!email || !password) {
    alert("Please enter your email and password");
    return;
  }

  try {
    const response = await fetch("https://communication-backend-wvkm.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.user);
    } else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    alert("Server error");
  }
};

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h1 className="project-title">
          AI Communication Analyzer
        </h1>

        <p className="project-quote">
          "Enhance your confidence. Improve your communication."
        </p>
      </div>

      <div className="auth-right">

        <div className="auth-card">
          <h2>Welcome Back 👋</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span 
              onClick={goToRegister}
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
            >
              Register
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;