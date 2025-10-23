import { useCartProducts } from "../../hooks/useCartProducts";

import classes from "./CartItem.module.css";

const CartItem = ({ item }) => {
  const { title, quantity, total, price } = item;

  const { addItem, removeItem } = useCartProducts();

  const onAddItemClickButtonHandler = () => {
    addItem(item);
  };

  const onRemoveItemClickButtonHandler = () => {
    removeItem(item);
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveItemClickButtonHandler}>-</button>
          <button onClick={onAddItemClickButtonHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
