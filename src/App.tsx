import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import { ICartItem, ICartItemState } from "./types/Cart.types";
import { useEffect } from "react";

interface ICartItemType {
  CartItem: {
    items: ICartItem[];
    showCart: boolean;
  };
}

function App() {
  const showCart: boolean = useSelector(
    (state: ICartItemType) => state.CartItem.showCart
  );
  const cart: ICartItem[] = useSelector(
    (state: ICartItemType) => state.CartItem.items
  );
  useEffect(() => {
    fetch("https://star-wars-f4c01-default-rtdb.firebaseio.com/Cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);
  return (
    <Layout>
      {showCart && <Cart />}
      {!showCart && <Products />}
    </Layout>
  );
}

export default App;
