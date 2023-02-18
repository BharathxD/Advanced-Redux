import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ICartItem } from "../types/Cart.types";
import { cartReducer } from ".";

const sendNotification = (status: string, title: string, message: string) => {
  return cartReducer.showNotification({
    status,
    title,
    message,
  });
};

const sendSuccessAction = () => {
  return { type: "SEND_CART_DATA_SUCCESS" };
};

const sendErrorAction = () => {
  return { type: "SEND_CART_DATA_ERROR" };
};

export const sendCartData = (cartData: ICartItem[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(sendNotification("Pending", "Sending...", "Sending Cart Data"));
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
        sendNotification(
          "success",
          "Success!!",
          "Successfully saved the Cart Data"
        )
      );
      dispatch(sendSuccessAction());
    } catch (e) {
      dispatch(
        sendNotification(
          "error",
          "Something went Wrong",
          "The cart data couldn't be saved"
        )
      );
      dispatch(sendErrorAction());
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(sendNotification("Pending", "Sending...", "Fetching Cart Data"));
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
              quantity:
                data[key].quantity > 1
                  ? --data[key].quantity
                  : data[key].quantity,
              price: data[key].price,
              total: data[key].total,
            },
          })
        );
      }

      dispatch(
        sendNotification(
          "success",
          "Success!!",
          "Successfully fetched the Cart Data"
        )
      );
      dispatch(sendSuccessAction());
    } catch (e) {
      dispatch(
        sendNotification(
          "error",
          "Something went Wrong",
          "The cart data couldn't be fetched"
        )
      );
      dispatch(sendErrorAction());
    }
  };
};
