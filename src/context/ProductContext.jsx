
import { createContext, useContext, useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { DB_UPDATE_EVENT } from "@/services/dataProviders/localStorageProvider";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Gagal memuat produk:', err);
      setError('Gagal memuat data produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      console.log('Terdeteksi perubahan database! Refresh data...');
      refreshProducts();
    };
    window.addEventListener(DB_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(DB_UPDATE_EVENT, handleUpdate);
  }, []);

  const createProduct = async (data) => {
    const newProduct = await productService.createProduct(data);
    return newProduct;
  };

  const updateProduct = async (id, data) => {
    const updated = await productService.updateProduct(id, data);
    return updated;
  };

  const deleteProduct = async (id) => {
    await productService.deleteProduct(id);
  };


  const getProductById = async (id) => {
    return await productService.getProductById(id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts,
        createProduct, 
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);