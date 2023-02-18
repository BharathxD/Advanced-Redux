import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  ICartItemState,
  ICartItemPayload,
  ICartItem,
  ICartNotifcationPayload,
} from "../types/Cart.types";

const cartInitialState: ICartItemState = {
  items: [],
  showCart: false,
  notification: null,
  changed: false,
};

const Cart = createSlice({
  name: "CartItem",
  initialState: cartInitialState,
  reducers: {
    increment(state: ICartItemState, action: PayloadAction<ICartItemPayload>) {
      const index: number = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.itemID
      );
      const item: ICartItem = state.items[index];
      item.quantity = item.quantity + 1;
      item.total = item.price * item.quantity;
      state.changed = true;
    },
    decrement(state, action: PayloadAction<ICartItemPayload>) {
      const index = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.itemID
      );
      const item = state.items[index];
      if (item.quantity === 1) {
        state.items.splice(index);
        return;
      }
      item.quantity = item.quantity - 1;
      item.total = item.price * item.quantity;
      state.changed = true;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action: PayloadAction<ICartItemPayload>) {
      if (!action.payload.items) return;
      state.changed = true;
      const newItem: ICartItem = action.payload.items;
      const existingCartItem: ICartItem = state.items.find(
        (item: ICartItem) => item.id === newItem.id
      );
      if (!existingCartItem) {
        state.items.push(newItem);
      } else {
        existingCartItem.quantity++;
        existingCartItem.total =
          existingCartItem.total + existingCartItem.price;
      }
    },
    showNotification(state, action: PayloadAction<ICartNotifcationPayload>) {
      if (!action.payload) return;
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default Cart;
