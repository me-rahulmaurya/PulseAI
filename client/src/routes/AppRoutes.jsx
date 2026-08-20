import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Health from "../pages/health/Health";
import Water from "../pages/water/Water";
import Medication from "../pages/medication/Medication";
import AIChat from "../pages/ai/AIChat";

import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />

          <Route path="/health" element={<Health />} />
          <Route path="/water" element={<Water/>}/>
          <Route path="/medication" element={<Medication/>}/>
          <Route path="/ai" element={<AIChat />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}