import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import AuthLayout from "./components/layout/authLayout";
import ArticlesPage from "./pages/articles";
import ArticleCreatePage from "./pages/articles/create";
import ArticleDetailPage from "./pages/articles/detail";
import Login from "./pages/auth/login";
import CheckinAvailablePage from "./pages/checkin-available";
import DashboardPage from "./pages/dashboard";
import SharingSchedulePage from "./pages/schedule";
import SettingPointPage from "./pages/setting-points";
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
        <Route path="/article/create/" element={<ArticleCreatePage />} />
        <Route path="/article/create/:date" element={<ArticleCreatePage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        <Route path="/setting-point" element={<SettingPointPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
