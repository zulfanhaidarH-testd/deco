import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../../components/user/products/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  const { products, loading } = useProducts();

  const featuredProducts = products.slice(0, 4);

  const categories = [
    { name: "Living Room", slug: "living-room", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Dining Room", slug: "dining-room", img: "https://images.unsplash.com/photo-1606659895509-8f0507fa5d5f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Office Room", slug: "office-room", img: "https://images.unsplash.com/photo-1631248366921-2c0f3583f6b8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ];

  // Configurasi Chatbot WhatsApp
  const phoneNumber = "6281310965401"; // Ganti dengan nomor WhatsApp tujuan
  const defaultMessage = "Halo, saya ingin bertanya tentang produk DecorInn.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <main className="flex-grow bg-slate-50 pb-20 relative">
      <HeroSection />

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Room</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="relative group rounded-2xl overflow-hidden shadow-md cursor-pointer h-48"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <h3 className="text-white text-xl font-bold tracking-wider">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          <Link to="/products" className="text-primary font-medium hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-slate-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ⬇️ TAMBAHAN FITUR CHATBOT WHATSAPP */}
      {/* Floating Action Button (FAB) - Melayang di pojok kanan bawah */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-gray-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group"
        title="Chat via WhatsApp"
      >
        <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-200" />
      </a>
    </main>
  );
}
