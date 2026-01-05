export const productServices = {
  // Data disesuaikan persis dengan screenshot
  _data: [
    { id: 1, name: "Sofa Minimalis", category: "living-room", price: 1500000, image: "https://picsum.photos/seed/sofa_minimalis/400/500" },
    { id: 2, name: "Meja Makan Kayu", category: "dining-room", price: 2000000, image: "https://picsum.photos/seed/meja_kayu/400/500" },
    { id: 3, name: "Lampu Gantung", category: "living-room", price: 450000, image: "https://picsum.photos/seed/lampu_gantung/400/500" },
    { id: 4, name: "Kursi Makan", category: "dining-room", price: 500000, image: "https://picsum.photos/seed/kursi_makan/400/500" },
    // Data dummy tambahan untuk testing filter kategori
    { id: 5, name: "Rak Buku Kerja", category: "office-room", price: 1200000, image: "https://picsum.photos/seed/office_rak/400/500" },
    { id: 6, name: "Meja Kerja", category: "office-room", price: 1800000, image: "https://picsum.photos/seed/office_meja/400/500" },
  ],

  getAllProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(productServices._data), 800);
    });
  },

  getProductsByCategory: async (categorySlug) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = productServices._data.filter(p => p.category === categorySlug);
        resolve(filtered);
      }, 600);
    });
  }
};