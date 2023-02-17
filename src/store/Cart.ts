import {
  AnyAction,
  Dispatch,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import {
  ICartItemState,
  ICartItemPayload,
  ICartItem,
  ICartNotifcationPayload,
  AppThunk,
} from "../types/Cart.types";
import { cartReducer } from ".";

const cartInitialState: ICartItemState = {
  items: [],
  showCart: false,
  notification: null,
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

export const sendCartData = (cartData: ICartItem[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(
      cartReducer.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://star-wars-f4c01-default-rtdb.firebaseio.com/Cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error Sending the Data");
      }
    };

    try {
      await sendRequest();
      dispatch(
        Cart.actions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Successfully saved the Cart Data",
        })
      );
      return { type: "SEND_CART_DATA_SUCCESS" };
    } catch (e) {
      dispatch(
        Cart.actions.showNotification({
          status: "error",
          title: "Something went Wrong",
          message: "The cart data couldn't be saved",
        })
      );
      return { type: "SEND_CART_DATA_ERROR" };
    }
  };
};

export default Cart;
