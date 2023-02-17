import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";

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
  const items = useSelector((state: itemsType) => state.CartItem.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => {
          return (<CartItem items={item} key={item.id}/>);
        })}
      </ul>
    </Card>
  );
};

export default Cart;
