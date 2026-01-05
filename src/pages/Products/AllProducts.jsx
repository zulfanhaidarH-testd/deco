// src/pages/Products/AllProducts.jsx
import { useState } from 'react'; 
import { useProducts } from '@/context/ProductContext'; 
import { ProductCard } from '@/Components/user/products/ProductCard';

export default function AllProducts() {
  const { products, loading } = useProducts(); 

  return (
    <main className="flex-grow bg-slate-50 py-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
          <p className="text-slate-500 mt-2">Browse our entire collection.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4,5,6,7,8].map((i) => (
               <div key={i} className="h-[450px] bg-slate-200 animate-pulse rounded-xl"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};