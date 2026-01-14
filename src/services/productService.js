import realApiProvider from './dataProviders/realApiProvider';
import localStorageProvider from './dataProviders/localStorageProvider';
 
const activeProvider = realApiProvider;

export const productService = {

  // ===== PRODUCTS =====
  getAllProducts: () => activeProvider.getAllProducts(),
  
  getProductById: (id) => activeProvider.getProductById(id),
  
  getProductsByCategory: (slug) => activeProvider.getProductsByCategory(slug),
  
  createProduct: (data) => activeProvider.createProduct(data),
  
  updateProduct: (id, data) => activeProvider.updateProduct(id, data),
  
  deleteProduct: (id) => activeProvider.deleteProduct(id),

  // ===== ORDERS / DASHBOARD =====
  getAllOrders: () => activeProvider.getAllOrders(),

  checkout: (data) => activeProvider.createOrder(data)
};

export const currentProvider = activeProvider.name;