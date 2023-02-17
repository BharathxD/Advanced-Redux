import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

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
  return (
    <li className={classes.item} key={productid}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
