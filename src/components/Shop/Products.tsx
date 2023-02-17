import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

interface Items {
  id: number;
  title: string;
  price: number;
}

interface IProductItems {
  ProductItem: {
    items: Items[];
  };
}

const Products: React.FC = () => {
  const productItems: Items[] = useSelector(
    (state: IProductItems) => state.ProductItem.items
  );
  const items = (productItems as Items[]).map((items) => {
    return (
      <ProductItem
        productid={items.id}
        title={items.title}
        price={items.price}
        description="This is a first product - amazing!"
        key={items.id}
      />
    );
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{items}</ul>
    </section>
  );
};

export default Products;
