import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

interface ICartButtonState {
  CartItem: { items: Array<[]> };
}

const CartButton: React.FC<{ onCartClick(): void }> = ({ onCartClick }) => {
  const cartItemCount: number = useSelector(
    (state: ICartButtonState) => state.CartItem.items.length
  );
  return (
    <button className={classes.button} onClick={onCartClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default CartButton;
