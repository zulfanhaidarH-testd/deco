// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export function AdminRoute() {
  const { loading, role, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Jika bukan admin, lempar ke login
  if (!role || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  // Jika admin, render anak-anaknya (Dashboard, ProductManagement)
  return <Outlet />;
};