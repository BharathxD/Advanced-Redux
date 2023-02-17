import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartItemReducer } from "../../store";

interface IProductItem {
  productid: number;
  title: string;
  price: number;
  description: string;
}

const ProductItem: React.FC<IProductItem> = ({
  productid,
  title,
  price,
  description,
}) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const item = {
      id: productid,
      title: title,
      quantity: 1,
      price: price,
      total: price,
      description: description,
    }
    dispatch(
      cartItemReducer.addToCart({
        items: item,
      })
    );
  };
  return (
    <li className={classes.item} key={productid}>
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
