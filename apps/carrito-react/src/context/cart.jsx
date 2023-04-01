import { useReducer, createContext } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { CART_ACTIONS } from "../consts.js";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    });

  const resetCart = () =>
    dispatch({
      type: CART_ACTIONS.RESET,
    });

  const increment = (id) =>
    dispatch({
      type: CART_ACTIONS.INCREMENT,
      payload: id,
    });

  const isInCart = (id) => {
    return state.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ cartList: state, addToCart, resetCart, increment, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
