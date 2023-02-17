import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";
import { IProductItems } from "../../types/Product.types";

interface IProductItemsFunction {
  ProductItem: {
    items: IProductItems[];
  };
}

const Products: React.FC = () => {
  const productItems: IProductItems[] = useSelector(
    (state: IProductItemsFunction) => state.ProductItem.items
  );
  const items = productItems.map((items) => {
    return (
      <ProductItem
        id={items.id}
        title={items.title}
        price={items.price}
        description={items.description}
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
