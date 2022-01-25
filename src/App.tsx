import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import DashboardPage from "./pages/dashboard";
import UnitPage from "./pages/unit";
import UserPage from "./pages/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/unit" element={<UnitPage />} />
      </Route>
    </Routes>
  );
}

export default App;
