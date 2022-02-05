import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import ArticlesPage from "./pages/articles";
import ArticleCreatePage from "./pages/articles/create";
import ArticleDetailPage from "./pages/articles/detail";
import CheckinAvailablePage from "./pages/checkin-available";
import DashboardPage from "./pages/dashboard";
import SharingSchedulePage from "./pages/schedule";
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
        <Route path="/schedule" element={<SharingSchedulePage />} />
        <Route path="/available-article" element={<CheckinAvailablePage />} />
        <Route path="/article" element={<ArticlesPage />} />
        <Route path="/article/create" element={<ArticleCreatePage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
