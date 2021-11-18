import { Store } from "redux";

let reduxStore: Store;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register: (store: Store) => {
    reduxStore = store;
  },
  getStore: () => reduxStore,
};
