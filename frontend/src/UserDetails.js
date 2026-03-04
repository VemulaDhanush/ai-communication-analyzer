import { useState } from "react";

function UserDetails({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !mobile) {
      alert("Please fill all details");
      return;
    }
    setUser({ name, email, mobile });
  };

  return (
    <div className="auth-wrapper">

      {/* 🔥 OUT-OF-BOX QUOTE */}
      <div className="hero-quote">
        <h1 className="brand-title">
          AI Communication Skills Analyzer
        </h1>
        <p>
          “Great communication is the bridge between ideas and success.”
        </p>
      </div>

      {/* 🔲 FORM CARD */}
      <div className="auth-card">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Get Started →
        </button>
      </div>

    </div>
  );
}

export default UserDetails;