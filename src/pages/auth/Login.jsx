// src/pages/auth/Login.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Shield, ShoppingCart, ArrowRight, Lock } from 'lucide-react';

export default function Login() { // Gunakan Default Export
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginAsAdmin = () => {
    login('admin');
    navigate('/admin/dashboard');
  };

  const handleLoginAsUser = () => {
    login('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">DecorInn</h1>
          <p className="mt-2 text-sm text-slate-500">
            Pilih Akses Masuk Anda
          </p>
        </div>

        {/* Pilihan Role */}
        <div className="grid gap-6">
          
          {/* Card Login Admin */}
          <Card className="group hover:border-primary transition-colors duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Masuk sebagai Admin
              </CardTitle>
              <CardDescription className="text-slate-500">
                Akses penuh manajemen produk & pesanan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleLoginAsAdmin}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white group-hover:bg-primary transition-colors duration-300"
                size="lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Buka Dashboard Admin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Card Login User */}
          <Card className="group hover:border-primary transition-colors duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Masuk sebagai User
              </CardTitle>
              <CardDescription className="text-slate-500">
                Belanja furniture impian Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleLoginAsUser}
                variant="outline"
                className="w-full border-slate-200 hover:border-primary hover:text-primary transition-colors duration-300"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Mulai Belanja
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

        </div>
        
        <div className="text-center text-xs text-slate-400">
          &copy; 2024 DecorInn System.
        </div>
      </div>
    </div>
  );
}