const BASE_URL = "https://695a3388950475ada46614a5.mockapi.io";

const PRODUCTS_URL = `${BASE_URL}/DecorinnStore`;
const ORDERS_URL = `${BASE_URL}/orders`;

const realApiProvider = {
  name: "realApiProvider",

  // ================= PRODUCTS =================
  getAllProducts: async () => {
    const res = await fetch(PRODUCTS_URL);

    return await res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${PRODUCTS_URL}/${id}`);
    return await res.json();
  },

  getProductsByCategory: async (slug) => {
    const res = await fetch(`${PRODUCTS_URL}?category=${slug}`);
    return await res.json();
  },

  createProduct: async (data) => {
    const res = await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
      }),
    });
    return await res.json();
  },

  updateProduct: async (id, data) => {
    const res = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
      }),
    });
    return await res.json();
  },

  deleteProduct: async (id) => {
  const res = await fetch(`${PRODUCTS_URL}/${id}`, { method: "DELETE" });
  },

  // ================= ORDERS =================
  createOrder: async (data) => {
    // Ambil semua produk
    const products = await fetch(PRODUCTS_URL).then((r) => r.json());

    // Kurangi stok berdasarkan quantity
    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      const currentStock = Number(product.stock) || 0;
      const orderQty = Number(item.quantity) || 0;
      const newStock = currentStock - orderQty;

      const res = await fetch(`${PRODUCTS_URL}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          stock: newStock < 0 ? 0 : newStock,
        }),
      });
    }

    // Simpan order (INI YANG DIPAKAI TOTAL REVENUE)
    const res = await fetch(ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        totalPrice: Number(data.totalPrice) || 0,
        createdAt: new Date().toISOString(),
      }),
    });

    return await res.json();
  },

  getAllOrders: async () => {
    const res = await fetch(ORDERS_URL);
    return await res.json();
  },
};

export default realApiProvider;
