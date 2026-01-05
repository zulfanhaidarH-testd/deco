// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/Button';

// ✅ TAMBahkan IMPORTS INI (Mereka hilang menyebabkan error)
//import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';

// --- Imports lainnya ---
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { productService } from '@/services/productService';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ShoppingCart
} from 'lucide-react';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAllProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  // Mock Statistics Calculation
  const totalProducts = products.length;
  const totalRevenue = 12545000; 
  const totalOrders = 142; 
  const totalCustomers = 89; 

  // Mock Recent Activities
  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #1234', time: '2 min ago' },
    { id: 2, type: 'stock', message: 'Stock updated for Sofa', time: '15 min ago' },
    { id: 3, type: 'user', message: 'New user registered', time: '1 hour ago' },
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ✅ Pastikan AdminSidebar dipanggil di sini */}
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
       
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-2">Welcome back, Admin! Here's what's happening.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
                <Package className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">+4</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">+8%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Customers</CardTitle>
                <Users className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-red-500" />
                  <span className="text-red-500">-2%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'stock' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                        {activity.type === 'stock' && <Package className="w-5 h-5" />}
                        {activity.type === 'user' && <Users className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <Activity className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Package className="w-4 h-4 mr-3" />
                  Manage Products
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Products */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Popular Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product) => (
                <Card key={product.id} className="flex flex-col">
                  <div className="aspect-[4/5] overflow-hidden bg-slate-200 rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                      <p className="text-sm text-slate-500 capitalize">{product.category.replace('-', ' ')}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold text-slate-900">{formatCurrency(product.price)}</p>
                      <span className="text-sm text-slate-500">Stock: {product.stock}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;