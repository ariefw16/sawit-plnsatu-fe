import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
