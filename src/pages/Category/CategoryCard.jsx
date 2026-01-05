import { useProducts } from '@/context/ProductContext';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/Components/user/products/ProductCard';
//import { productServices } from '../../services/product.services';

export default function CategoryPage() {
  const { categorySlug } = useParams();

  const { products, loading } = useProducts();

  const categoryProducts = products.filter(p => p.category === categorySlug);

  const categoryName = categorySlug?.replace('-', ' ');

  return (
    <main className="flex-grow bg-slate-50 pb-20">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 capitalize">
            {categoryName} Collection
          </h1>
          <p className="text-muted-foreground mt-2">
            Jelajahi pilihan terbaik kami untuk {categoryName}.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="h-[400px] bg-slate-200 animate-pulse rounded-xl"></div>
             ))}
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-slate-500">Belum ada produk di kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}