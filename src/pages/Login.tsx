import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { loginUser } from "../api/authApi";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { SessionType } from "../core/typing/tokens";
import { getStorage } from "../core/services/storage.services";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      console.log(username, password);
      await loginUser(username, password);
      console.log(`navigating`, getStorage(SessionType.AccessToken));
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error", err);
    }
    window.location.reload();
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <Input type="text" placeholder="Login" className="auth-input" inputValue={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" className="auth-input" inputValue={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        {error && <p className="auth-error">{error}</p>}
        <Button text="Sign In" className="auth-button" />
        <div className="auth-footer">
            <p className="auth-text">Not registered yet?</p>
            <Button
                text="Sign Up"
                className="auth-button-secondary"
                onClick={() => navigate("/signup")}
            />
        </div>
      </form>
    </div>
  );
};

export default Login;
