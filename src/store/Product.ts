import { createSlice } from "@reduxjs/toolkit";
import { IProductItemsState } from "../types/Product.types";

const productInitialState: IProductItemsState = {
  items: [
    {
      id: 1,
      title: "Test Item 1",
      price: 6,
      description: "lorem ipsum",
    },
    {
      id: 2,
      title: "Test Item 2",
      price: 12,
      description: "lorem ipsum",
    },
  ],
};

const Product = createSlice({
  name: "ProductItem",
  initialState: productInitialState,
  reducers: {},
});

export default Product;
