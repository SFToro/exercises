import { writable } from "svelte/store";
import { productList } from "../mocks/products.json";

const { subscribe, set, update } = writable(productList);

function createProductStore() {
  return {
    subscribe,

    reduceStockByOneAndFlagInCart: ({ id }) => {
      update((currentList) => {
        let indexToUpdate;
        if (id) {
          indexToUpdate = currentList.findIndex((item) => item.id === id);
        }

        if (currentList[indexToUpdate].stock < 1) return currentList;
        // currentList[indexToUpdate] = {
        //   ...currentList[indexToUpdate],
        //   stock: currentList[indexToUpdate].stock - 1,
        //   isInCart: true,
        // };

        currentList[indexToUpdate].isInCart = true;
        currentList[indexToUpdate].stock -= 1;

        return currentList;
      });
    },

    refillStockAndRemoveCartFlag: (id, qty) => {
      update((currentList) => {
        const idx = id;
        const indexToUpdate = currentList.findIndex((item) => item.id === idx);
        currentList[indexToUpdate] = {
          ...currentList[indexToUpdate],
          stock: currentList[indexToUpdate].stock + qty,
          isInCart: false,
        };
        return currentList;
      });
    },
    findProduct: (id) => {
      let product = null;
      subscribe((currentList) => {
        product = currentList.find((item) => item.id === id);
      });
      return product;
    },
  };
}

export const products = createProductStore();
