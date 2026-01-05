// src/services/mockApiService.js

const STORAGE_KEY_PRODUCTS = 'decorinn_products_v1';
const STORAGE_KEY_ORDERS = 'decorinn_orders_v1';

// Initial Seed Data
const initialProducts = [
  { id: '1', name: 'Sofa Minimalis', category: 'living-room', price: 1500000, image: 'https://picsum.photos/seed/sofa_minimalis/400/500', stock: 15 },
  { id: '2', name: 'Meja Makan Kayu', category: 'dining-room', price: 2000000, image: 'https://picsum.photos/seed/meja_kayu/400/500', stock: 8 },
  { id: '3', name: 'Lampu Gantung', category: 'living-room', price: 450000, image: 'https://picsum.photos/seed/lampu_gantung/400/500', stock: 25 },
  { id: '4', name: 'Kursi Makan', category: 'dining-room', price: 500000, image: 'https://picsum.photos/seed/kursi_makan/400/500', stock: 20 },
  { id: '5', name: 'Rak Buku Kerja', category: 'office-room', price: 1200000, image: 'https://picsum.photos/seed/office_rak/400/500', stock: 12 },
  { id: '6', name: 'Meja Kerja', category: 'office-room', price: 1800000, image: 'https://picsum.photos/seed/office_meja/400/500', stock: 10 },
];

// Helper Functions
const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Initialize Data if Empty
if (!localStorage.getItem(STORAGE_KEY_PRODUCTS)) {
  setStorage(STORAGE_KEY_PRODUCTS, initialProducts);
}

export const mockApiService = {
  // Simulate Network Delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // --- PRODUCTS ---

  getAllProducts: async () => {
    await mockApiService.delay(300);
    return getStorage(STORAGE_KEY_PRODUCTS);
  },

  getProductById: async (id) => {
    await mockApiService.delay(200);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    return products.find(p => p.id === id);
  },

  getProductsByCategory: async (categorySlug) => {
    await mockApiService.delay(300);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    return products.filter(p => p.category === categorySlug);
  },

  createProduct: async (productData) => {
    await mockApiService.delay(500);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const newProduct = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
      price: parseInt(productData.price),
      stock: parseInt(productData.stock) || 0,
      category: productData.category || 'living-room' // Default category
    };
    products.unshift(newProduct); // Add to beginning
    setStorage(STORAGE_KEY_PRODUCTS, products);
    return newProduct;
  },

  updateProduct: async (id, updates) => {
    await mockApiService.delay(500);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      const updatedProduct = {
        ...products[index],
        ...updates,
        price: updates.price ? parseInt(updates.price) : products[index].price,
        stock: updates.stock !== undefined ? parseInt(updates.stock) : products[index].stock
      };
      products[index] = updatedProduct;
      setStorage(STORAGE_KEY_PRODUCTS, products);
      return updatedProduct;
    }
    throw new Error('Product not found');
  },

  deleteProduct: async (id) => {
    await mockApiService.delay(400);
    let products = getStorage(STORAGE_KEY_PRODUCTS);
    products = products.filter(p => p.id !== id);
    setStorage(STORAGE_KEY_PRODUCTS, products);
    return { success: true };
  },

  // --- CHECKOUT & ORDERS (SYSTEM LOGIC) ---

  createOrder: async ({ userEmail, items }) => {
    await mockApiService.delay(800);

    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const processedItems = [];
    
    // 1. Validate Stock & Prepare Order Items
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      
      if (!product) {
        throw new Error(`Produk ${item.name} tidak ditemukan.`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Stok tidak cukup untuk ${product.name}. Tersedia: ${product.stock}, Diminta: ${item.quantity}`);
      }

      processedItems.push({
        productId: item.productId,
        name: item.name,
        price: product.price, // Use current DB price
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      });
    }

    // 2. Calculate Total & Create Order
    const total = processedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userEmail: userEmail || 'guest@decorinn.com',
      total: total,
      status: 'pending',
      items: processedItems,
      createdAt: new Date().toISOString()
    };

    const orders = getStorage(STORAGE_KEY_ORDERS);
    orders.unshift(newOrder); // Add orders
    setStorage(STORAGE_KEY_ORDERS, orders);

    // 3. Update Stock (SYSTEM ACTION - Reduce Stock)
    const updatedProducts = products.map(product => {
      const cartItem = processedItems.find(i => i.productId === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    });

    setStorage(STORAGE_KEY_PRODUCTS, updatedProducts);

    return newOrder;
  }
};