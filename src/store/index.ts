import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import Product from "./Product";

const store = configureStore({
  reducer: {
    CartItem: Cart.reducer,
    ProductItem: Product.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const cartReducer = Cart.actions;
export default store;
