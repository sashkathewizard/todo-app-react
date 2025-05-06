import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "././styles/App.css";
import { AppRouter } from "./routes/AppRouter";
import { getStorage } from "./core/services/storage.services";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { SessionType } from "./core/typing/tokens";

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkToken = () => {
        const accessToken = getStorage(SessionType.AccessToken);
        console.log(`Token in storage ${accessToken}`);
        setToken(accessToken);
        setLoading(false);
      };
  
      checkToken();
  
      window.addEventListener("storage", checkToken);
      return () => {
        window.removeEventListener("storage", checkToken);
      };
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <Router>
        <Routes>
          {token ? (
            <Route path="/*" element={<AppRouter />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Router>
    );
  }

export default App;
