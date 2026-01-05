
import { Search, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/Components/ui/Button';

export const AdminNavbar = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-30 ml-64">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-900" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-900">Admin User</div>
            <div className="text-xs text-slate-500">Super Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};