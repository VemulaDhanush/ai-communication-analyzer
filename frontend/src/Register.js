import { useState } from "react";

function Register({ goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("https://communication-backend-wvkm.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful ✅");
        goToLogin();  // Register ayyaka login page ki vellali
      } else {
        alert(data.message || "Registration failed");
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
          "Speak better. Think clearer. Perform smarter."
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={handleRegister}>
            Register
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span 
              onClick={goToLogin}
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
            >
              Login
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;