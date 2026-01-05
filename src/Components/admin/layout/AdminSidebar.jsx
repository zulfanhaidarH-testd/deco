
import { NavLink, useNavigate } from 'react-router-dom';

import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Home, LogOut, User, Shield } from 'lucide-react';


import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/Components/ui/avatar';

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/Components/ui/dropdown-menu';


import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  
  {
    title: "Product Management",
    href: "/admin/product-management",
    icon: ShoppingCart,
  },
  
  
];

export function AdminSidebar() {
  const navigate = useNavigate(); 
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 shadow-xl z-40">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <NavLink to="/admin/dashboard" className="flex items-center gap-3 text-xl font-bold hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Home className="w-5 h-5" />
          </div>
          DecorInn
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Main Menu
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
        
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white group-hover:text-white">
                  Admin Account
                </p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">
                  Super Admin
                </p>
              </div>
              
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-9 w-9 border border-slate-600">
                  <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
                  <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" side="right" className="w-56 bg-slate-800 border-slate-700 text-slate-100">
            <DropdownMenuLabel className="font-normal text-slate-200">
              <p className="text-sm font-medium">Admin Account</p>
              <p className="text-xs text-slate-400">superadmin@decorinn.com</p>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-slate-700" />
            
            <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">
              <User className="mr-2 h-4 w-4 text-slate-400" />
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">
              <Shield className="mr-2 h-4 w-4 text-slate-400" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-slate-700" />
            
        
            <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-950/20">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}