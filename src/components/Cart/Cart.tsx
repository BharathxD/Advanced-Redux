import { Fragment } from "react";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { ICartItem } from "../../types/Cart.types";

type itemsType = {
  CartItem: {
    items: [
      {
        id: number;
        title: string;
        quantity: number;
        total: number;
        price: number;
      }
    ];
  };
};

const Cart: React.FC = () => {
  const items: ICartItem[] = useSelector(
    (state: itemsType) => state.CartItem.items
  );
  return (
    <Card className={classes.cart}>
      {items.length !== 0 && (
          <ul>
            {items.map((item) => {
              return <CartItem items={item} key={item.id} />;
            })}
          </ul>
      )}
      {items.length === 0 && (
        <p className={classes.empty}>
          <span>Your cart is empty</span>
        </p>
      )}
    </Card>
  );
};

export default Cart;
