import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "././styles/App.css";
import { AppRouter } from "./routes/AppRouter";
import { SessionType } from "./typing/tokens";
import { getStorage } from "./core/services/storage.services";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const accessToken = getStorage(SessionType.AccessToken);
      setToken(accessToken);
    };

    checkToken();

    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="/*" element={<AppRouter/>} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
