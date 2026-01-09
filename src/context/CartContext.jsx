import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const checkout = async (userEmail) => {
    if (cart.length === 0) return;

    // Convert cart items to format expected by API
    const orderItems = cart.map(item => ({
      productId: item.id || item.productId, 
      name: item.name,
      quantity: item.quantity
    }));

    try {
  
      const { productService } = await import('@/services/productService');
      
      await productService.checkout({
        userEmail,
        items: orderItems
      });

    
      setCart([]);
      closeCart();
      alert('Checkout berhasil! Terima kasih sudah berbelanja.');
    } catch (error) {
      alert(`Gagal checkout: ${error.message}`);
    }
  };

  const getItemQuantity = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Fungsi kontrol Drawer
  const toggleCart = () => setIsOpen(!isOpen);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        checkout,
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        getItemQuantity, 
        cartTotal,
        isOpen,     
        toggleCart, 
        openCart,
        closeCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}