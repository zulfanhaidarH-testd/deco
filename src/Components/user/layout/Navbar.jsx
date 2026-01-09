// src/Components/user/layout/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Settings, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/Components/ui/dropdown-menu';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { cart, openCart } = useCart(); 
  const { logout, role } = useAuth();
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 hover:opacity-80 transition-opacity">
          DecorInn
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Cart Trigger */}
          <button 
            onClick={openCart} 
            className="relative hover:text-slate-900 text-slate-500 transition-colors focus:outline-none"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-bold animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* User Menu with Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border-2 border-transparent hover:border-slate-200 focus:ring-2 focus:ring-primary transition-all">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/seed/user123/100/100" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">My Account</p>
                <p className="text-xs leading-none text-muted-foreground">customer@decorinn.com</p>
              </DropdownMenuLabel>
      
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;