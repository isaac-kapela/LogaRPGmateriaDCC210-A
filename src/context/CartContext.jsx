import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find((i) => i.product.id === action.product.id);
      if (exists) {
        return state.map((i) =>
          i.product.id === action.product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { product: action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.product.id !== action.id);
    case 'SET_QTY':
      return state.map((i) =>
        i.product.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = 'forja-cart';

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add    = (product) => dispatch({ type: 'ADD', product });
  const remove = (id)      => dispatch({ type: 'REMOVE', id });
  const setQty = (id, qty) => dispatch({ type: 'SET_QTY', id, qty });
  const clear  = ()        => dispatch({ type: 'CLEAR' });

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
