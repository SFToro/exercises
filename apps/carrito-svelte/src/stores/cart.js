import { writable } from "svelte/store";
import { products } from "./products";

const { subscribe, set, update } = writable([]);

function createCartStore() {
  return {
    subscribe,
    incrementQty: (id) => {
      update((currentCart) => {
        const indexToUpdate = currentCart.findIndex((item) => item.id === id);
        if (currentCart[indexToUpdate].stock < 1) return currentCart;
        currentCart[indexToUpdate].qty += 1;
        currentCart[indexToUpdate].stock += 1;
        return currentCart;
      });
      products.reduceStockByOneAndFlagInCart({ id });
    },
    remove: (id) => {
      update((currentCart) => {
        const indexToUpdate = currentCart.findIndex((item) => item.id === id);
        const refillQty = currentCart[indexToUpdate].qty;
        products.refillStockAndRemoveCartFlag(id, refillQty);
        currentCart.splice(indexToUpdate, 1);
        return currentCart;
      });
    },
    addToCart: (id) => {
      update((currentCart) => {
        const product = products.findProduct(id);

        if (product.stock < 1) return currentCart;
        products.reduceStockByOneAndFlagInCart({ id });

        return [
          ...currentCart,
          { ...product, qty: 1, stock: product.stock - 1 },
        ];
      });
    },
    isInCart: (id) => {
      let currentCart = [];
      subscribe((cart) => {
        currentCart = cart;
      });
      return currentCart.some((element) => element.id === id);
    },
  };
}

export const customCart = createCartStore();
