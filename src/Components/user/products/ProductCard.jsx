import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "/src/context/CartContext.jsx";

export const ProductCard = ({ product }) => {
  const { getItemQuantity, addToCart, decreaseQuantity, increaseQuantity } =
    useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quantity = getItemQuantity(product.id);
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  // Fungsi untuk menutup modal dan menambah ke cart
  const handleBuyFromModal = () => {
    addToCart(product);
    setIsModalOpen(false);
  };

  // Placeholder deskripsi (karena data product belum ada field description)
  

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border-slate-100">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 truncate">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-slate-600 font-medium">{formattedPrice}</span>

            {quantity === 0 ? (
              // Ubah "Buy" menjadi "Preview"
              <Button
                variant="outline"
                className="h-9 px-4 text-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Preview
              </Button>
            ) : (
              <div className="flex items-center bg-slate-100 rounded-md p-1">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-slate-200 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-slate-200 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* POP UP MODAL PREVIEW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header / Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-slate-100 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-xl">
              {/* Gambar Produk */}
              <div className="aspect-[4/5] md:aspect-auto bg-slate-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detail Produk */}
              <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                <div>
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                      {product.category.replace("-", " ")}
                    </span>
                  </div>

                  {/* Nama Produk */}
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    {product.name}
                  </h2>

                  {/* Harga */}
                  <div className="text-2xl font-bold text-primary mb-6">
                    {formattedPrice}
                  </div>

                  {/* Deskripsi Produk */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Deskripsi</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Info Tambahan (Optional) */}
                  <div className="flex gap-4 text-xs text-slate-500 mb-6">
                    <span>
                      Stock:{" "}
                      <span className="font-medium text-slate-700">
                        {product.stock}
                      </span>
                    </span>
                    <span>
                      ID:{" "}
                      <span className="font-mono text-slate-700">
                        {product.id.substring(0, 8)}...
                      </span>
                    </span>
                  </div>
                </div>

                {/* Tombol Buy di Footer Modal */}
                <div className="border-t border-slate-100 pt-6 mt-auto">
                  <Button
                    onClick={handleBuyFromModal}
                    className="w-full h-12 text-base"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
