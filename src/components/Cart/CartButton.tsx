import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton: React.FC<{ onCartClick(): void }> = (props) => {
  const cartItemCount = useSelector(
    (state: { CartItem: { items: [] } }) =>
      state.CartItem.items.length
  );
  return (
    <button className={classes.button} onClick={props.onCartClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default CartButton;
