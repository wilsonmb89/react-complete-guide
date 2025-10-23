import Card from "../UI/Card";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import { useSelector } from "react-redux";

const Cart = (props) => {

  const cartOrders = useSelector(state => state.cartOrdersState.orders);

  const content =
    cartOrders.length > 0 ? (
      <ul>
        {cartOrders.map((order) => (
          <CartItem key={order.id} item={order} />
        ))}
      </ul>
    ) : (
      <p>Please add some product!</p>
    );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
    </Card>
  );
};

export default Cart;
