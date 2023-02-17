import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartReducer } from "../../store";
import { ICartItem } from "../../types/Cart.types";

interface IProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
}

interface ICartItemStateType {
  CartItem: { items: ICartItem[] };
}

const ProductItem: React.FC<IProductItem> = ({
  id,
  title,
  price,
  description,
}) => {
  const cart = useSelector((state: ICartItemStateType) => state.CartItem.items);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const item: ICartItem = {
      id: id,
      title: title,
      quantity: 1,
      price: price,
      total: price,
    };
    dispatch(
      cartReducer.addToCart({
        items: item,
      })
    );

    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    // dispatch(
    //   cartActions.addItemToCart({
    //     id,
    //     title,
    //     price,
    //   })
    // );
  };
  // };
  return (
    <li className={classes.item} key={id}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
