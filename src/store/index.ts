import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const productInitialState = {
  items: [
    {
      id: 1,
      title: "Test Item 1",
      price: 6,
    },
    {
      id: 2,
      title: "Test Item 2",
      price: 12,
    },
  ],
};

const cartInitialState = {
  items: [
    {
      id: 1,
      title: "Test Item",
      quantity: 0,
      total: 0,
      price: 6,
    },
  ],
  showCart: false,
};

const cartItems = createSlice({
  name: "CartItem",
  initialState: cartInitialState,
  reducers: {
    increment(state, action) {
      const index = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.id
      );
      state.items[index].quantity = state.items[index].quantity + 1;
      state.items[index].total =
        state.items[index].price * state.items[index].quantity;
    },
    decrement(state, action) {
      const index = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.id
      );
      if (state.items[index].quantity <= 0) {
        return;
      }
      state.items[index].quantity = state.items[index].quantity - 1;
      state.items[index].total =
        state.items[index].price * state.items[index].quantity;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action) {
      state.items.push(action.payload.items);
    },
  },
});

const productItems = createSlice({
  name: "ProductItem",
  initialState: productInitialState,
  reducers: {},
});

const store = configureStore({
  reducer: {
    CartItem: cartItems.reducer,
    ProductItem: productItems.reducer,
  },
});

export const cartItemReducer = cartItems.actions;
export const productItemsReducer = cartItems.actions;
export default store;
