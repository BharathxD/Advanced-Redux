import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartItemReducer } from "../../store";

const MainHeader: React.FC = () => {
  const dispatch = useDispatch();
  const cartClickHandler = () => {
    dispatch(cartItemReducer.toggleCart());
  };
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onCartClick={cartClickHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
