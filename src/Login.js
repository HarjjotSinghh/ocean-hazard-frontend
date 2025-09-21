import { useState } from "react";
import "./Form.css";

function Login() {
  const [showForgot, setShowForgot] = useState(false);
  const [resetData, setResetData] = useState({ emailOrMobile: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful!");
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link/OTP sent to ${resetData.emailOrMobile}`);
    setShowForgot(false);
    setResetData({ emailOrMobile: "" });
  };

  return (
    <div className="form-container">
      <h3>User Login</h3>

      {!showForgot ? (
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Password:</label>
          <input type="password" name="password" required />

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>

          <p style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#004aad",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit}>
          <label>Enter Email or Mobile Number:</label>
          <input
            type="text"
            name="emailOrMobile"
            value={resetData.emailOrMobile}
            onChange={handleResetChange}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Send Reset Link / OTP
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
