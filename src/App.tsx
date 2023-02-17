import "./App.css";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const showCart: boolean = useSelector(
    (state: { CartItem: { showCart: boolean } }) => state.CartItem.showCart
  );
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
