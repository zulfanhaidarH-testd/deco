// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute() {
  const { loading, role, isUser } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Checking...</div>;
  }

  // Hanya user (atau admin yang mau lihat user view) yang boleh lewat
  if (!role || !isUser()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};