import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import DashboardPage from "./pages/dashboard";
import UnitPage from "./pages/unit";
import UnitDetailPage from "./pages/unit/detail";
import UserPage from "./pages/user";
import DetailUserPage from "./pages/user/detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/:id" element={<DetailUserPage />} />
        <Route path="/unit" element={<UnitPage />} />
        <Route path="/unit/:id" element={<UnitDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
