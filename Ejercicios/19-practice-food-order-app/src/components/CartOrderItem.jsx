import { useContext } from "react";

import { formatCurrencyNumber } from "../utils/string";
import { CartOrdersContext } from "../store/cart-orders-context";

export default function CartOrderItem({ orderData }) {
  const { name, count, price } = orderData;
  const totalPriceItems = price * count;
  const totalPriceItemsFormatted = formatCurrencyNumber(totalPriceItems);

  const { addCartOrder, removeCartOrder } = useContext(CartOrdersContext);

  const onClickRemoveOrderHandler = () => {
    removeCartOrder(orderData);
  };

  const onClickAddOrderHandler = () => {
    addCartOrder(orderData);
  };

  return (
    <li className="cart-item">
      <p>
        {name} - {formatCurrencyNumber(price)} X {count} -&gt;{" "}
        {totalPriceItemsFormatted}
      </p>
      <p className="cart-item-actions">
        <button onClick={onClickRemoveOrderHandler}>-</button>
        <span>{count}</span>
        <button onClick={onClickAddOrderHandler}>+</button>
      </p>
    </li>
  );
}
