// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- PROVIDERS ---
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// --- ROUTES (GUARDS) ---
import { AdminRoute } from './routes/AdminRoute';
import { UserRoute } from './routes/UserRoute';

// --- PAGES ---
import Login from './pages/auth/Login';

// User Pages
import Checkout from './pages/checkout/Checkout';
import Home from './pages/Utama/Home';
import CategoryPage from './pages/Category/CategoryCard';
import AllProducts from './pages/Products/AllProducts';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';

// --- LAYOUTS ---
import Navbar from './Components/user/layout/Navbar';
import Footer from './Components/user/layout/Footer';
import CartDrawer from './Components/user/layout/CartDrawer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
              
              {/* ✅ ROUTES (HANYA SATU BLOK) */}
              <Routes>
                
                {/* 1. LOGIN (Public) */}
                <Route path="/login" element={<Login />} />

                {/* 2. ADMIN (Protected) */}
                <Route element={<AdminRoute />}>
                  {/* ✅ PERBAIKAN: TIDAK ADA DIV WRAPPER DI SINI */}
                  {/* Layout ada di dalam Dashboard & ProductManagement */}
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/product-management" element={<ProductManagement />} />
                </Route>

                {/* 3. USER (Protected + Inline Layout) */}
                <Route element={<UserRoute />}>
                  <Route path="/" element={
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow"><Home /></main>
                      <Footer />
                      <CartDrawer />
                    </div>
                  } />
                  
                  <Route path="/category/:categorySlug" element={
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow"><CategoryPage /></main>
                      <Footer />
                      <CartDrawer />
                    </div>
                  } />
                  
                  <Route path="/products" element={
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow"><AllProducts /></main>
                      <Footer />
                      <CartDrawer />
                    </div>
                  } />
                </Route>

                  {/*  CHECKOUT ROUTE */}
                  <Route path="/checkout" element={
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow">
                        <Checkout />
                      </main>
                      <Footer />
                      <CartDrawer />
                    </div>
                  } />
                  

                {/* 4. DEFAULT REDIRECT */}
                <Route path="/" element={<Navigate to="/login" replace />} />

              </Routes>

            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;