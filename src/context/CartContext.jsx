import { createContext, useContext, useState } from "react";
import { productService } from "@/services/productService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // ================= CART ACTIONS =================
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ================= CHECKOUT (INI YANG PENTING UNTUK REVENUE) =================
  const checkout = async (userEmail, itemsToCheckout = null) => {
    const items = itemsToCheckout || cart;
    if (items.length === 0) return;

    const orderItems = items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 0,
      subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    try {
      await productService.checkout({
        userEmail,
        items: orderItems,
        totalPrice, // ✅ INI YANG BUAT TOTAL REVENUE NAIK
      });

      // Bersihkan cart
      if (itemsToCheckout) {
        const ids = new Set(itemsToCheckout.map((i) => i.id));
        setCart((prev) => prev.filter((item) => !ids.has(item.id)));
      } else {
        setCart([]);
      }

      closeCart();
    } catch (error) {
      console.error("Checkout gagal:", error);
      throw error;
    }
  };

  // ================= HELPERS =================
  const getItemQuantity = (id) =>
    cart.find((item) => item.id === id)?.quantity || 0;

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ================= UI STATE =================
  const toggleCart = () => setIsOpen(!isOpen);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        checkout,
        getItemQuantity,
        cartTotal,
        isOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
