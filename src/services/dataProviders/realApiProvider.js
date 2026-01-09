// src/services/dataProviders/realApiProvider.js

// ⬇️ URL untuk PRODUK
const BASE_URL = "https://695a3388950475ada46614a5.mockapi.io/DecorinnStore";

// ⬇️ URL untuk ORDER (resource "orders" yang baru dibuat)
const ORDERS_URL = `${BASE_URL}/orders`;

const realApiProvider = {
  name: "realApiProvider",

  getAllProducts: async () => {
    const res = await fetch(BASE_URL);
    return await res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
  },

  getProductsByCategory: async (slug) => {
    const res = await fetch(`${BASE_URL}?category=${slug}`);
    return await res.json();
  },

  createProduct: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  updateProduct: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteProduct: async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },

  createOrder: async (data) => {
    // 1. Ambil semua produk untuk mendapatkan stok saat ini
    const productsRes = await fetch(BASE_URL);
    const products = await productsRes.json();

    // 2. Update stok setiap produk yang dibeli
    for (const item of data.items) {
      const product = products.find(p => p.id === item.productId);
      
      if (product) {
        const newStock = product.stock - item.quantity; // KURANGI stok!
        
        // Update stok produk di endpoint produk
        await fetch(`${BASE_URL}/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            stock: newStock
          }),
        });
      }
    }

    // 3. Simpan order ke endpoint TERPISAH (orders)
    const res = await fetch(ORDERS_URL, {  // PAKAI ORDERS_URL!
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    return await res.json();
  },
};

export default realApiProvider;