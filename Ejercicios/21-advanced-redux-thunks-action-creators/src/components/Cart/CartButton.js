import { useDispatch, useSelector } from "react-redux";

import classes from "./CartButton.module.css";
import { toggleVisibility } from "../../store/cart-orders-store";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.cartOrdersState.orders);
  const totalQuantity = orders.reduce((curr, order) => {
    return curr +order.quantity;
  }, 0);

  const onMyCartClickButtonHadler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <button className={classes.button} onClick={onMyCartClickButtonHadler}>
      <span>My Cart</span>
      <span className={classes.badge}>{ totalQuantity }</span>
    </button>
  );
};

export default CartButton;
