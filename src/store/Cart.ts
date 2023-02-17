import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ICartItemState,
  ICartItemPayload,
  ICartItem,
} from "../types/Cart.types";

const cartInitialState: ICartItemState = {
  items: [],
  showCart: false,
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
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action: PayloadAction<ICartItemPayload>) {
      if (!action.payload.items) return;
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
  },
});

export default Cart;
