import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- Gunakan Link untuk navigasi tanpa reload
import { HeroSection } from './HeroSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { ProductCard } from '../../Components/user/products/ProductCard';
import { useProducts } from '@/context/ProductContext';

export default function Home() {
  // Ambil data produk & status loading dari Context
  const { products, loading } = useProducts();

  // Ambil 4 produk terbaru untuk featured
  const featuredProducts = products.slice(0, 4);

  // Daftar kategori untuk tombol navigasi
  const categories = [
    { name: "Living Room", slug: "living-room", img: "https://picsum.photos/seed/living/300/200" },
    { name: "Dining Room", slug: "dining-room", img: "https://picsum.photos/seed/dining/300/200" },
    { name: "Office Room", slug: "office-room", img: "https://picsum.photos/seed/office/300/200" }
  ];

  return (
    <main className="flex-grow bg-slate-50 pb-20">
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
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-slate-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          // Render Products dari Context
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}