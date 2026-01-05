// src/services/dataProviders/realApiProvider.js

// ⬇️ TARUH URL MOCKAPI-MU DI SINI
const BASE_URL = "https://695a3388950475ada46614a5.mockapi.io/DecorinnStore";

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
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
};

export default realApiProvider;
