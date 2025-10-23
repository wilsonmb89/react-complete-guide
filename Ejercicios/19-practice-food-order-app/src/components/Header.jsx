import { useContext } from "react";

import Button from "./UI/Button";
import UserProgress from "./UserProgress";

import foodLogo from "../assets/logo.jpg";
import { CartOrdersContext } from "../store/cart-orders-context";
import { ModalContext } from "../store/modal-context";

export default function Header() {
  const { cartOrders } = useContext(CartOrdersContext);
  const { updateModal } = useContext(ModalContext);

  const totalCartOrdersItems = cartOrders.reduce(
    (accumulated, currentOrder) => {
      const orderItems = currentOrder.count;

      return accumulated + orderItems;
    },
    0
  );

  const onClickCartButtonHandler = () => {
    updateModal(UserProgress);
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={foodLogo} alt="ReactFood app logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={onClickCartButtonHandler} textOnly>
          Cart ({totalCartOrdersItems})
        </Button>
      </nav>
    </header>
  );
}
