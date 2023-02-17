import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import Product from "./Product";

const store = configureStore({
  reducer: {
    CartItem: Cart.reducer,
    ProductItem: Product.reducer,
  },
});

export const cartItemReducer = Cart.actions;
export default store;