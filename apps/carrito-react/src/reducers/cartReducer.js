import { CART_ACTIONS } from "../consts.js";

const actions = {
  [CART_ACTIONS.ADD]: (state, action) => {
    const product = action.payload;
    return [...state, { ...product, qty: 1 }];
  },

  [CART_ACTIONS.INCREMENT]: (state, action) => {
    const id = action.payload;
    const idxToUpdate = state.findIndex((product) => {
      return product.id === id;
    });
    const newCartList = [...state];
    newCartList[idxToUpdate] = {
      ...newCartList[idxToUpdate],
      qty: newCartList[idxToUpdate].qty + 1,
    };
    return newCartList;
  },

  [CART_ACTIONS.RESET]: () => [],
};

export const cartReducer = (state, action) => {
  const actionToExecute = actions[action.type];
  return actionToExecute ? actionToExecute(state, action) : state;
};
