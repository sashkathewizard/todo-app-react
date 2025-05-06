import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";


export const AppRouter: React.FC = () => {
  return (
    <div className="appContainer">

    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
    </Routes>
    </div>
  );
};

