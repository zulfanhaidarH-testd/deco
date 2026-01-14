import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productService } from "@/services/productService";

import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS & ORDERS =================
  useEffect(() => {
    Promise.all([
      productService.getAllProducts(),
      productService.getAllOrders(),
    ])
      .then(([productData, orderData]) => {
        setProducts(productData || []);
        setOrders(orderData || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= TOTAL REVENUE (ANTI NaN) =================
  const totalRevenue = orders.reduce((sum, order) => {
    return (
      sum +
      (order.items || []).reduce((s, item) => {
        const qty = Number(item.qty ?? item.quantity ?? 0);
        const price = Number(item.price ?? 0);
        return s + qty * price;
      }, 0)
    );
  }, 0);

  // ================= BASIC STATS =================
  const totalProducts = products.length;
  const totalOrders = orders.length;

  // ================= CUSTOMERS (UNIQUE EMAIL) =================
  const totalCustomers = new Set(
    orders.map((o) => o.userEmail).filter(Boolean)
  ).size;

  // ================= RECENT ACTIVITY (REAL DATA) =================
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((order) => ({
      id: order.id,
      message: `New order #${order.id} by ${order.userEmail}`,
      time: new Date(order.createdAt).toLocaleString("id-ID"),
    }));

  // ================= POPULAR PRODUCTS =================
  const salesMap = {};
  orders.forEach((o) =>
    (o.items || []).forEach((i) => {
      const qty = Number(i.qty ?? i.quantity ?? 0);
      salesMap[i.productId] = (salesMap[i.productId] || 0) + qty;
    })
  );

  const topIds = Object.entries(salesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((x) => x[0]);

  let displayProducts = topIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (displayProducts.length < 3) {
    const exist = new Set(displayProducts.map((p) => p.id));
    displayProducts = [
      ...displayProducts,
      ...products
        .filter((p) => p.stock > 0 && !exist.has(p.id))
        .slice(0, 3 - displayProducts.length),
    ];
  }

  console.log("Popular Products:", displayProducts);

  // ================= HELPERS =================
  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const stats = [
    { title: "Total Products", value: totalProducts, icon: Package },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
    },
    { title: "Orders", value: totalOrders, icon: ShoppingCart },
    { title: "Customers", value: totalCustomers, icon: Users },
  ];

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i}>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm">{stat.title}</CardTitle>
                  <Icon className="w-4 h-4" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{a.message}</p>
                  <p className="text-xs text-slate-500">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ================= POPULAR PRODUCTS ================= */}
        <h2 className="text-xl font-bold mb-4">Popular Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((p) => (
            <Card key={p.id}>
              <img
                src={p.image}
                alt={p.name}
                className="h-64 w-full object-cover rounded-t"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-500 capitalize">
                  {p.category}
                </p>
                <div className="flex justify-between mt-3">
                  <span>{formatCurrency(p.price)}</span>
                  <span>Stock: {p.stock}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default Dashboard;