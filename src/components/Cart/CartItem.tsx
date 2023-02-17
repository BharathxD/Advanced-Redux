import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartReducer } from "../../store";

interface ICartItemProps {
  items: {
    id: number
    title: string;
    quantity: number;
    total: number;
    price: number;
  };
}

const CartItem: React.FC<ICartItemProps> = ({ items }) => {
  const dispatch = useDispatch();
  const onIncrementHandler = () => {
    dispatch(cartReducer.increment({ itemID: items.id }));
  };
  const onDecrementHandler = () => {
    dispatch(cartReducer.decrement({ itemID: items.id }));
  };
  return (
    <li className={classes.item} key={items.id.toString()}>
      <header>
        <h3>{items.title}</h3>
        <div className={classes.price}>
          ${items.total.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${items.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{items.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onDecrementHandler}>-</button>
          <button onClick={onIncrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
