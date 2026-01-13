// src/services/dataProviders/localStorageProvider.js

// ============================================
// CONFIG
// ============================================
const STORAGE_KEY_PRODUCTS = 'decorinn_db_products_v2';
const STORAGE_KEY_ORDERS = 'decorinn_db_orders_v2';
const DB_UPDATE_EVENT = 'DECORINN_DB_UPDATE_V1';

// ============================================
// EVENT BROADCAST (DEV / MOCK ONLY)
// ============================================
const dispatchUpdateEvent = () => {
  window.dispatchEvent(new CustomEvent(DB_UPDATE_EVENT));
};

// ============================================
// HELPERS
// ============================================
const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const simulateDelay = (ms = 300) =>
  new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// SEED DATA
// ============================================
if (!localStorage.getItem(STORAGE_KEY_PRODUCTS)) {
  setStorage(STORAGE_KEY_PRODUCTS, [
    { id: '1', name: 'Sofa Minimalis', category: 'living-room', price: 1500000, stock: 10 },
    { id: '2', name: 'Meja Kerja', category: 'office-room', price: 1200000, stock: 8 },
  ]);
}

// ============================================
// PROVIDER (I/O ONLY)
// ============================================
const localStorageProvider = {
  name: 'localStorageProvider',

  async getAllProducts() {
    await simulateDelay();
    return getStorage(STORAGE_KEY_PRODUCTS);
  },

  async getProductById(id) {
    await simulateDelay();
    return getStorage(STORAGE_KEY_PRODUCTS).find(p => p.id === id) || null;
  },

  async getProductsByCategory(slug) {
    await simulateDelay();
    return getStorage(STORAGE_KEY_PRODUCTS).filter(p => p.category === slug);
  },

  async createProduct(data) {
    await simulateDelay();
    const products = getStorage(STORAGE_KEY_PRODUCTS);

    const newProduct = {
      ...data,
      id: Date.now().toString(),
      price: Number(data.price),
      stock: Number(data.stock) || 0,
    };

    products.unshift(newProduct);
    setStorage(STORAGE_KEY_PRODUCTS, products);
    dispatchUpdateEvent();

    return newProduct;
  },

  async updateProduct(id, data) {
    await simulateDelay();
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) throw new Error('Produk tidak ditemukan');

    products[index] = { ...products[index], ...data };
    setStorage(STORAGE_KEY_PRODUCTS, products);
    dispatchUpdateEvent();

    return products[index];
  },

  async deleteProduct(id) {
    await simulateDelay();
    setStorage(
      STORAGE_KEY_PRODUCTS,
      getStorage(STORAGE_KEY_PRODUCTS).filter(p => p.id !== id)
    );
    dispatchUpdateEvent();
  },

  async updateStock(productId, newStock) {
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    product.stock = newStock;
    setStorage(STORAGE_KEY_PRODUCTS, products);
  },

  async createOrder(order) {
    await simulateDelay();
    const orders = getStorage(STORAGE_KEY_ORDERS);
    orders.unshift(order);
    setStorage(STORAGE_KEY_ORDERS, orders);
    dispatchUpdateEvent();
    return order;
  }
};

export { DB_UPDATE_EVENT };
export default localStorageProvider;
