import realApiProvider from './dataProviders/realApiProvider';
import localStorageProvider from './dataProviders/localStorageProvider';
 
// ➜ pilih provider aktif (cukup ganti 1 baris ini kalau mau balik ke local)
const activeProvider = realApiProvider;

export const productService = {

  getAllProducts: () => activeProvider.getAllProducts(),
  
  getProductById: (id) => activeProvider.getProductById(id),
  
  getProductsByCategory: (slug) => activeProvider.getProductsByCategory(slug),
  
  createProduct: (data) => activeProvider.createProduct(data),
  
  updateProduct: (id, data) => activeProvider.updateProduct(id, data),
  
  deleteProduct: (id) => activeProvider.deleteProduct(id),
  
  checkout: (data) => activeProvider.createOrder(data)
};

export const currentProvider = activeProvider.name;
