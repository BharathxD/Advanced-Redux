import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { ICartItem, ICartItemState } from "./types/Cart.types";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/CartActions";

interface ICartItemType {
  CartItem: ICartItemState;
}

let isInitial = true;

function App() {
  const showCart: boolean = useSelector(
    (state: ICartItemType) => state.CartItem.showCart
  );
  const cart: ICartItem[] = useSelector(
    (state: ICartItemType) => state.CartItem.items
  );
  const cartChanged: boolean = useSelector(
    (state: ICartItemType) => state.CartItem.changed
  );
  const notification = useSelector(
    (state: ICartItemType) => state.CartItem.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const sendData = async () => {
      dispatch(await fetchCartData()(dispatch));
    };
    sendData();
  }, [dispatch]);
  useEffect(() => {
    const sendData = async () => {
      dispatch(await sendCartData(cart)(dispatch));
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cartChanged) {
      sendData();
    }
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
