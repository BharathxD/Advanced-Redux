import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ICartItem } from "../types/Cart.types";
import { cartReducer } from ".";

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
      if (!response.ok) {
        throw new Error("Error Sending the Data");
      }
    };

    try {
      await sendRequest();
      dispatch(
        cartReducer.showNotification({
          status: "success",
          title: "Success!!",
          message: "Successfully saved the Cart Data",
        })
      );
      return { type: "SEND_CART_DATA_SUCCESS" };
    } catch (e) {
      dispatch(
        cartReducer.showNotification({
          status: "error",
          title: "Something went Wrong",
          message: "The cart data couldn't be saved",
        })
      );
      return { type: "SEND_CART_DATA_ERROR" };
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(
      cartReducer.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Fetching Cart Data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://star-wars-f4c01-default-rtdb.firebaseio.com/Cart.json",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error Sending the Data");
      } else {
        return data;
      }
    };

    try {
      const data = await sendRequest();
      console.log(data);
      for (const key in data) {
        dispatch(
          cartReducer.addToCart({
            items: {
              id: data[key].id,
              title: data[key].title,
              quantity: --data[key].quantity,
              price: data[key].price,
              total: data[key].total,
            },
          })
        );
      }

      dispatch(
        cartReducer.showNotification({
          status: "success",
          title: "Success!!",
          message: "Successfully fetched the Cart Data",
        })
      );
      return { type: "SEND_CART_DATA_SUCCESS" };
    } catch (e) {
      dispatch(
        cartReducer.showNotification({
          status: "error",
          title: "Something went Wrong",
          message: "The cart data couldn't be fetched",
        })
      );
      return { type: "SEND_CART_DATA_ERROR" };
    }
  };
};
