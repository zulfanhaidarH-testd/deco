// src/services/dataProviders/localStorageProvider.js

// ============================================
// 🔔 KONFIGURASI DATABASE (LocalStorage)
// ============================================
const STORAGE_KEY_PRODUCTS = 'decorinn_db_products_v2';
const STORAGE_KEY_ORDERS = 'decorinn_db_orders_v2';

const DB_UPDATE_EVENT = 'DECORINN_DB_UPDATE_V1'; // <--- KONSTANTA EVENT

// ============================================
// 📢 FUNGSI BROADCAST EVENT (SIGNAL SYSTEM)
// ============================================
const dispatchUpdateEvent = () => {
  // Buat custom event
  const event = new CustomEvent(DB_UPDATE_EVENT);  
  // Dispatch ke window (seluruh aplikasi bisa mendengar)
  window.dispatchEvent(event);  
  console.log('📢 SIGNAL: Database diupdate! Broadcast ke App...');
};

// ============================================
// 🌱 SEED DATA (Data Awal)
// ============================================
const initialProducts = [
  { id: '1', name: 'Sofa Minimalis', category: 'living-room', price: 1500000, image: 'https://picsum.photos/seed/sofa_minimalis/400/500', stock: 15 },
  { id: '2', name: 'Meja Makan Kayu', category: 'dining-room', price: 2000000, image: 'https://picsum.photos/seed/meja_kayu/400/500', stock: 8 },
  { id: '3', name: 'Lampu Gantung', category: 'living-room', price: 450000, image: 'https://picsum.photos/seed/lampu_gantung/400/500', stock: 25 },
  { id: '4', name: 'Kursi Makan', category: 'dining-room', price: 500000, image: 'https://picsum.photos/seed/kursi_makan/400/500', stock: 20 },
  { id: '5', name: 'Rak Buku Kerja', category: 'office-room', price: 1200000, image: 'https://picsum.photos/seed/office_rak/400/500', stock: 12 },
  { id: '6', name: 'Meja Kerja', category: 'office-room', price: 1800000, image: 'https://picsum.photos/seed/office_meja/400/500', stock: 10 },
];

// ============================================
// 🛠️ HELPER FUNCTIONS (LocalStorage Ops)
// ============================================
const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.error(`Error reading storage key: ${key}`, e);
    return [];
  }
};

const setStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing storage key: ${key}`, e);
  }
};

// ============================================
// 📦 PROVIDER INITIALIZATION
// ============================================
// Cek apakah data produk sudah ada, jika belum -> Seed data awal
if (!localStorage.getItem(STORAGE_KEY_PRODUCTS)) {
  setStorage(STORAGE_KEY_PRODUCTS, initialProducts);
}

// ============================================
// ⏳ NETWORK SIMULATION
// ============================================
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// 🗃️ EXPORTED PROVIDER OBJECT
// ============================================
const localStorageProvider = {
  
  // --- METADATA ---
  name: 'localStorageProvider',
  version: '1.0.0',

  // --- PRODUCT ACTIONS (READ) ---
  
  /**
   * Ambil semua produk
   */
  getAllProducts: async () => {
    await simulateDelay(300); // Simulasi loading
    return getStorage(STORAGE_KEY_PRODUCTS);
  },

  /**
   * Ambil produk by ID
   */
  getProductById: async (id) => {
    await simulateDelay(200);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    return products.find(p => p.id === id) || null;
  },

  /**
   * Ambil produk by category (untuk User)
   */
  getProductsByCategory: async (categorySlug) => {
    await simulateDelay(300);
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    return products.filter(p => p.category === categorySlug);
  },

  // --- PRODUCT ACTIONS (WRITE / ADMIN) ---

  /**
   * Create produk baru (ADMIN)
   */
  createProduct: async (productData) => {
    await simulateDelay(500);
    
    if (!productData.name || !productData.price) {
      throw new Error('Nama dan Harga produk wajib diisi');
    }

    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const newProduct = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
      price: parseInt(productData.price),
      stock: parseInt(productData.stock) || 0,
      category: productData.category || 'living-room'
    };
    
    products.unshift(newProduct); // Add to beginning (terbaru di atas)
    setStorage(STORAGE_KEY_PRODUCTS, products);

    // 📢 BROADCAST EVENT
    dispatchUpdateEvent();

    return newProduct;
  },

  /**
   * Update produk (ADMIN)
   */
  updateProduct: async (id, updates) => {
    await simulateDelay(500);
    
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error(`Produk dengan ID ${id} tidak ditemukan`);
    }

    // Merge data lama dengan update baru
    const updatedProduct = {
      ...products[index],
      ...updates,
      // Pastikan price & stock selalu number
      price: updates.price ? parseInt(updates.price) : products[index].price,
      stock: updates.stock !== undefined ? parseInt(updates.stock) : products[index].stock
    };

    products[index] = updatedProduct;
    setStorage(STORAGE_KEY_PRODUCTS, products);

    // 📢 BROADCAST EVENT
    dispatchUpdateEvent();

    return updatedProduct;
  },

  /**
   * Delete produk (ADMIN)
   */
  deleteProduct: async (id) => {
    await simulateDelay(400);
    
    let products = getStorage(STORAGE_KEY_PRODUCTS);
    products = products.filter(p => p.id !== id);
    
    if (products.length === getStorage(STORAGE_KEY_PRODUCTS).length) {
      throw new Error(`Produk dengan ID ${id} tidak ditemukan untuk dihapus`);
    }

    setStorage(STORAGE_KEY_PRODUCTS, products);

    // 📢 BROADCAST EVENT
    dispatchUpdateEvent();

    return { success: true, message: 'Produk berhasil dihapus' };
  },

  // --- CHECKOUT & ORDER ACTIONS (SYSTEM LOGIC) ---

  /**
   * Buat order baru & Kurangi stok (SYSTEM)
   */
  createOrder: async (orderData) => {
    await simulateDelay(800); // Simulasi proses checkout

    const { userEmail, items } = orderData;
    const products = getStorage(STORAGE_KEY_PRODUCTS);
    const processedOrderItems = [];
    
    // 1. VALIDASI STOK & PERSIAPAN ORDER ITEMS
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      
      if (!product) {
        throw new Error(`Produk "${item.name}" tidak ditemukan.`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Stok tidak cukup untuk "${product.name}". Tersedia: ${product.stock}, Diminta: ${item.quantity}`);
      }

      processedOrderItems.push({
        productId: item.productId,
        name: item.name,
        price: product.price, // Use current DB price
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      });
    }

    // 2. HITUNG TOTAL & BUAT ORDER
    const total = processedOrderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userEmail: userEmail || 'guest@decorinn.com',
      total: total,
      status: 'pending',
      items: processedOrderItems,
      createdAt: new Date().toISOString()
    };

    // Simpan Order
    const orders = getStorage(STORAGE_KEY_ORDERS);
    orders.unshift(newOrder); // Add orders
    setStorage(STORAGE_KEY_ORDERS, orders);

    // 3. UPDATE STOCK (SYSTEM ACTION - REDUCE STOCK)
    // Kita map ulang products dan kurangi stok sesuai cart
    const updatedProducts = products.map(product => {
      const cartItem = processedOrderItems.find(i => i.productId === product.id);
      
      if (cartItem) {
        return { 
          ...product, 
          stock: product.stock - cartItem.quantity 
        };
      }
      
      return product; // Tidak ada perubahan jika produk ini tidak dibeli
    });

    setStorage(STORAGE_KEY_PRODUCTS, updatedProducts);

    // 📢 BROADCAST EVENT (Karena stok produk berubah)
    dispatchUpdateEvent();

    return newOrder;
  }
};

// ============================================
// 🚨 EXPORTS (PENTING!)
// ============================================
export { DB_UPDATE_EVENT }; // <--- Ini yang mengatasi Error Anda
export default localStorageProvider;
