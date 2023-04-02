import { writable } from "svelte/store";
import { ImageStatus } from "../types.d";

function createImgStore() {
  const { set, update, subscribe } = writable({
    status: ImageStatus.READY,
    original: null,
    modified: null,
    get isReady() {
      return this.status === ImageStatus.READY;
    },
    get isDone() {
      return this.status === ImageStatus.DONE;
    },
    get isUploading() {
      return this.status === ImageStatus.UPLOADING;
    },
  });

  return {
    subscribe,
    set,
    setStatusReady() {
      update((store) => {
        store.status = ImageStatus.READY;
        return store;
      });
    },
    setStatusDone() {
      update((store) => {
        store.status = ImageStatus.DONE;
        return store;
      });
    },
    setStatusUploading() {
      update((store) => {
        store.status = ImageStatus.UPLOADING;
        return store;
      });
    },
    setModified(url) {
      update((store) => {
        store.modified = url;
        return store;
      });
    },
    setOriginal(url) {
      update((store) => {
        store.original = url;
        return store;
      });
    },
  };
}

export const img = createImgStore();
