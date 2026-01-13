// src/services/dataProviders/realApiProvider.js

const BASE_URL = "https://695a3388950475ada46614a5.mockapi.io/DecorinnStore";
const ORDERS_URL = `${BASE_URL}/orders`;

const realApiProvider = {
  name: "realApiProvider",

  async getAllProducts() {
    return fetch(BASE_URL).then(res => res.json());
  },

  async getProductById(id) {
    return fetch(`${BASE_URL}/${id}`).then(res => res.json());
  },

  async getProductsByCategory(slug) {
    return fetch(`${BASE_URL}?category=${slug}`).then(res => res.json());
  },

  async createProduct(data) {
    return fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async updateProduct(id, data) {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async deleteProduct(id) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  },

  async updateStock(productId, newStock) {
    const product = await this.getProductById(productId);

    await fetch(`${BASE_URL}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        stock: newStock,
      }),
    });
  },

  async createOrder(order) {
    return fetch(ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then(res => res.json());
  }
};

export default realApiProvider;
