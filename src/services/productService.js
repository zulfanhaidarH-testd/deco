// src/services/productService.js

import realApiProvider from './dataProviders/realApiProvider';
// import localStorageProvider from './dataProviders/localStorageProvider';

// 🔁 GANTI PROVIDER DI SINI SAJA
const provider = realApiProvider;

export const productService = {

  getAllProducts() {
    return provider.getAllProducts();
  },

  getProductById(id) {
    return provider.getProductById(id);
  },

  getProductsByCategory(slug) {
    return provider.getProductsByCategory(slug);
  },

  createProduct(data) {
    return provider.createProduct(data);
  },

  updateProduct(id, data) {
    return provider.updateProduct(id, data);
  },

  deleteProduct(id) {
    return provider.deleteProduct(id);
  },

  async checkout({ userEmail, items }) {
    const products = await provider.getAllProducts();
    const processedItems = [];

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        throw new Error('Produk tidak ditemukan');
      }

      if (product.stock < item.quantity) {
        throw new Error(`Stok ${product.name} tidak cukup`);
      }

      processedItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      });
    }

    const total = processedItems.reduce((sum, i) => sum + i.subtotal, 0);

    // UPDATE STOCK
    for (const item of processedItems) {
      const product = products.find(p => p.id === item.productId);
      await provider.updateStock(product.id, product.stock - item.quantity);
    }

    // CREATE ORDER
    return provider.createOrder({
      id: `ORD-${Date.now()}`,
      userEmail: userEmail || 'guest@decorinn.com',
      items: processedItems,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
  }
};

export const currentProvider = provider.name;
