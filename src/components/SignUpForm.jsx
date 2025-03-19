import { useState } from "react";
// import "./App.css"; // ✅ Import the CSS file

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSubmit(event) {
    e.preventDefault();
    console.log("Submit button clicked!");

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log("Signup Response:", result);

      if (response.ok) {
        setToken(result.token);
        console.log("Token set:", result.token);
        setSuccessMessage(result.message || "Signup successful!");
        setError(null);
      } else {
        setError(result.error || "Signup failed.");
        setSuccessMessage(null);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup.");
      setSuccessMessage(null);
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up!</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Username: 
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="input-field"
          />
        </label>
        <label>
          Password: 
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
