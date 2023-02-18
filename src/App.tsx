import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { ICartItemState } from "./types/Cart.types";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/CartActions";

interface ICartItemType {
  CartItem: ICartItemState;
}

function App() {
  const {
    showCart,
    items: cart,
    changed: cartChanged,
    notification,
  } = useSelector((state: ICartItemType) => state.CartItem);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartData()(dispatch);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const sendData = async () => {
      await sendCartData(cart)(dispatch);
    };
    if (cartChanged) sendData();
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
      <Layout>{showCart ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}

export default App;
