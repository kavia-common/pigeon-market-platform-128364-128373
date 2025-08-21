import React, { createContext, useContext, useMemo, useState } from 'react';
import { cartApi } from '../services/api';

// PUBLIC_INTERFACE
export const CartContext = createContext(null);

// PUBLIC_INTERFACE
export function useCart() {
  /** Access cart actions and state from context. */
  return useContext(CartContext);
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /**
   * Provides cart state and actions application-wide.
   * Persists via cartApi (localStorage-backed in this mock).
   */
  const [items, setItems] = useState(cartApi.get());

  const add = (item) => {
    const next = cartApi.add(item);
    setItems(next);
  };

  const remove = (id) => {
    const next = cartApi.remove(id);
    setItems(next);
  };

  const clear = () => {
    cartApi.clear();
    setItems([]);
  };

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  }, [items]);

  const count = useMemo(() => {
    return items.reduce((sum, i) => sum + (i.qty || 1), 0);
  }, [items]);

  const value = useMemo(() => {
    return { items, add, remove, clear, total, count };
  }, [items, total, count]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
