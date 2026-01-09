import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productService } from "@/services/productService";
import { Package, Users, DollarSign, ShoppingCart, Activity } from "lucide-react";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAllProducts().then(data => {
      setProducts(data.filter(i => !i.userEmail));
      setOrders(data.filter(i => i.userEmail));
    }).finally(() => setLoading(false));
  }, []);

  // --- LOGIKA STATISTIK & POPULAR PRODUCTS (DIOMPAK) ---
  const productPriceMap = products.reduce((map, p) => { map[p.id] = p.price; return map; }, {});
  
  const totalRevenue = orders.reduce((sum, order) => 
    sum + (order.items || []).reduce((s, item) => s + ((productPriceMap[item.productId] || 0) * item.quantity), 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  // Popular Products Logic
  const salesMap = {};
  orders.forEach(o => (o.items || []).forEach(i => salesMap[i.productId] = (salesMap[i.productId] || 0) + i.quantity));
  const topIds = Object.entries(salesMap).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);
  let displayProducts = topIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  
  if (displayProducts.length < 3) {
    const existingIds = new Set(displayProducts.map(p => p.id));
    displayProducts = [...displayProducts, ...products.filter(p => p.stock > 0 && !existingIds.has(p.id)).slice(0, 3 - displayProducts.length)];
  }

  // Recent Activities Logic
  const recentActivities = [
    ...orders.slice(0, 2).map(order => ({ id: order.id, type: 'order', message: `New order #${order.id?.substring(0, 8)}...`, time: 'Just now' })),
    { id: 'stock-1', type: 'stock', message: 'Stock updated for Sofa', time: '15 min ago' },
    { id: 'user-1', type: 'user', message: 'New user registered', time: '1 hour ago' },
  ];

  // Helpers
  const formatCurrency = (a) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(a);
  const iconMap = { Package, DollarSign, ShoppingCart, Users };

  // --- DATA STATISTIK ---
  const stats = [
    { title: "Total Products", value: totalProducts, icon: Package },
    { title: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign },
    { title: "Orders", value: totalOrders, icon: ShoppingCart },
    { title: "Customers", value: 89, icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-2">Welcome back, Admin! Here's what's happening.</p>
          </div>

          {/* Stats Cards (MAP ARRAY) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-slate-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((a, idx) => {
                  const ActivityIcon = a.type === 'order' ? ShoppingCart : a.type === 'stock' ? Package : Users;
                  const bgClass = a.type === 'order' ? 'bg-blue-100 text-blue-600' : a.type === 'stock' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600';
                  return (
                    <div key={a.id || idx} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgClass}`}>
                        <ActivityIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{a.message}</p>
                        <p className="text-xs text-slate-500">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost"><Activity className="w-4 h-4 mr-3" />View Analytics</Button>
                <Button className="w-full justify-start" variant="ghost"><Package className="w-4 h-4 mr-3" />Manage Products</Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Products */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Popular Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayProducts.map(p => (
                <Card key={p.id} className="flex flex-col">
                  <div className="aspect-[4/5] overflow-hidden bg-slate-200 rounded-t-lg">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 truncate">{p.name}</h3>
                      <p className="text-sm text-slate-500 capitalize">{p.category.replace('-', ' ')}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold text-slate-900">{formatCurrency(p.price)}</p>
                      <span className="text-sm text-slate-500">Stock: {p.stock}</span>
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
