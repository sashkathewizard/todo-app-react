import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { signUpUser } from "../api/authApi";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUpUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error("Sign up error", err);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <Input
        type="text"
        placeholder="Name"
        className="auth-input"
        inputValue={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        className="auth-input"
        inputValue={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        className="auth-input"
        inputValue={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        className="auth-input"
        inputValue={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="auth-error">{error}</p>}
      <Button text="Sign Up" className="auth-button" onClick={handleSignUp} />
      <div className="auth-footer">
        <p className="auth-text">Already have an account?</p>
        <Button
          text="Sign In"
          className="auth-button-secondary"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default SignUp;