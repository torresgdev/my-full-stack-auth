import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/Dashboard";

const AppRoutes: React.FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;