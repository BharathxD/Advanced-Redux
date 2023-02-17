import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { ICartItem, ICartItemState } from "./types/Cart.types";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { cartReducer } from "./store";

interface ICartItemType {
  CartItem: ICartItemState;
}

function App() {
  const showCart: boolean = useSelector(
    (state: ICartItemType) => state.CartItem.showCart
  );
  const cart: ICartItem[] = useSelector(
    (state: ICartItemType) => state.CartItem.items
  );
  const notification = useSelector(
    (state: ICartItemType) => state.CartItem.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartReducer.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "Sending Cart Data",
        })
      );
      try {
        const response = await fetch(
          "https://star-wars-f4c01-default-rtdb.firebaseio.com/Cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Error Sending the Data");
        }
        dispatch(
          cartReducer.showNotification({
            status: "success",
            title: "Success!!",
            message: "Successfully saved the Cart Data",
          })
        );
      } catch (e) {
        dispatch(
          cartReducer.showNotification({
            status: "error",
            title: "Something went Wrong",
            message: "The cart data couldn't be saved",
          })
        );
      }
    };
    sendCartData();
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        {!showCart && <Products />}
      </Layout>
    </Fragment>
  );
}

export default App;
