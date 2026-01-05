// src/routes/UserRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function UserRoute() {
  const { loading, role, isUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Checking permissions...</div>;
  }

  // Opsi 1: Hanya user yang boleh akses
  // if (!role || !isUser()) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // Opsi 2 (Disarankan): Admin juga boleh melihat view user (mirip Shopify Admin)
  // Tapi user TIDAK boleh akses admin.
  // Sesuai prompt: "User hanya bisa mengakses halaman user" -> strict mode Opsi 1.
  
  if (!role || !isUser()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}