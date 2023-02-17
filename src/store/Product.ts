import { createSlice } from "@reduxjs/toolkit";

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

const Product = createSlice({
  name: "ProductItem",
  initialState: productInitialState,
  reducers: {},
});

export default Product;
