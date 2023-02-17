import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { ICartItem, ICartItemState } from "./types/Cart.types";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/Cart";

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
  const notification = useSelector(
    (state: ICartItemType) => state.CartItem.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const sendData = async () => {
      dispatch(await sendCartData(cart)(dispatch));
    };
    sendData();
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
