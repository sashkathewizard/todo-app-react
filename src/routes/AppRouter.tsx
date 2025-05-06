import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Todos from "../pages/Todos";


export const AppRouter: React.FC = () => {
  return (
    <div className="appContainer">

    <Routes>
      <Route path="/todos" element={<Todos />} />
      {/* <Route
        path="/logout"
        element={
          (() => {
          localStorage.clear();
          sessionStorage.clear();
          return <Navigate to="/todos" />;
          })()
        }
      /> */}
      <Route path="/" element={<Navigate to="/todos" />} />

    </Routes>
    </div>
  );
};

