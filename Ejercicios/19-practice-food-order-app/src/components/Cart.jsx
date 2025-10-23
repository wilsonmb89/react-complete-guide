import { useContext } from "react";

import CartOrderItem from "./CartOrderItem";
import Button from "./UI/Button";

import { CartOrdersContext } from "../store/cart-orders-context";
import { formatCurrencyNumber } from "../utils/string";

export default function Cart({ onClickCheckout, onCloseSummary }) {
  const { cartOrders } = useContext(CartOrdersContext);

  const totalCartOrdersPrice = cartOrders.reduce(
    (accumulated, currentOrder) => {
      const orderTotalPrice = Number(currentOrder.price) * currentOrder.count;

      return accumulated + orderTotalPrice;
    },
    0
  );

  const totalCartOrdersPriceFormatted =
    formatCurrencyNumber(totalCartOrdersPrice);

  const onClickCheckoutHandler = () => {
    onClickCheckout("CHECKOUT");
  };

  const onClickCloseButtonHandler = () => {
    onCloseSummary();
  }

  return (
    <>
      <h2>Your Cart</h2>
      <ul>
        {cartOrders.map((cartOrder) => (
          <CartOrderItem key={cartOrder.id} orderData={cartOrder} />
        ))}
      </ul>
      <p className="cart-total">{totalCartOrdersPriceFormatted}</p>
      <p className="modal-actions">
        <Button onClick={onClickCloseButtonHandler} textOnly>
          Close
        </Button>
        <Button
          disabled={cartOrders.length === 0}
          onClick={onClickCheckoutHandler}
        >
          Go to Checkout
        </Button>
      </p>
    </>
  );
}
