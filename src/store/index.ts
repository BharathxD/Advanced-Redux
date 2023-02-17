import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

interface ICartItemState {
  items:
    | Array<{
        id: number;
        title: string;
        quantity: number;
        total: number;
        price: number;
      }>
    | Array<any>;
  showCart: boolean;
}

interface ICartItemPayload {
  items?: {
    id: number;
    title: string;
    quantity: number;
    total: number;
    price: number;
  };
  itemID?: number;
}

const cartInitialState: ICartItemState = {
  items: [],
  showCart: false,
};

const cartItems = createSlice({
  name: "CartItem",
  initialState: cartInitialState,
  reducers: {
    increment(state: ICartItemState, action: PayloadAction<ICartItemPayload>) {
      const index = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.itemID
      );
      state.items[index].quantity = state.items[index].quantity + 1;
      state.items[index].total =
        state.items[index].price * state.items[index].quantity;
    },
    decrement(state, action: PayloadAction<ICartItemPayload>) {
      const index = state.items.findIndex(
        (item: { id: number }) => item.id === action.payload.itemID
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
    addToCart(state, action: PayloadAction<ICartItemPayload>) {
      if (!action.payload.items) return;
      const newItem = action.payload.items;
      const existingCartItem = state.items.find(
        (item: {
          id: number;
          title: string;
          quantity: number;
          total: number;
          price: number;
        }) => item.id === newItem.id
      );
      if (!existingCartItem) {
        state.items.push(newItem);
      } else {
        existingCartItem.quantity++;
        existingCartItem.total = existingCartItem.total + existingCartItem.price;
      }
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
