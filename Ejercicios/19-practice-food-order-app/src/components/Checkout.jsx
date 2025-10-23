import { useActionState, useContext, useEffect } from "react";

import Button from "./UI/Button";
import Input from "./UI/Input";

import { CartOrdersContext } from "../store/cart-orders-context";
import { formatCurrencyNumber } from "../utils/string";
import { ModalContext } from "../store/modal-context";
import { useHttp } from "../hooks/useHttp";

export default function Checkout({ onGoBack }) {
  const { cartOrders, resetCartOrders } = useContext(CartOrdersContext);

  const { unmountModal } = useContext(ModalContext);

  const { submitOrder } = useHttp();

  const submitFormActionHandler = async (precFormState, formData) => {
    const formDataObject = Object.fromEntries(formData.entries());

    let errors = [];
    let orderCreated = false;

    if (formDataObject.fullName.length < 4) {
      errors.push("Invalid fullname");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataObject.email)) {
      errors.push("Invalid email");
    }

    if (!/^\d{5}$/.test(formDataObject.postalCode)) {
      errors.push("Invalid postal code");
    }

    if (errors.length === 0) {
      const { error, message } = await submitOrder(cartOrders, formDataObject);

      errors = error
        ? ["Error trying submit order, please try later :("]
        : [message];
      orderCreated = !error && message;
    }

    return {
      errors: errors.length > 0 ? errors : null,
      enteredValues: errors.length > 0 ? { ...formDataObject } : null,
      orderCreated,
    };
  };

  const [formState, formAction, pending] = useActionState(submitFormActionHandler, {
    errors: [],
  });

  const totalCartOrdersPrice = cartOrders.reduce(
    (accumulated, currentOrder) => {
      const orderTotalPrice = Number(currentOrder.price) * currentOrder.count;

      return accumulated + orderTotalPrice;
    },
    0
  );

  const totalCartOrdersPriceFormatted =
    formatCurrencyNumber(totalCartOrdersPrice);

  const onGoBackButtonHandler = () => {
    onGoBack();
  };

  useEffect(() => {
    if (formState.orderCreated) {
      setTimeout(() => {
        resetCartOrders();
        unmountModal();
      }, 3000);
    }
  }, [formState.orderCreated, resetCartOrders, unmountModal]);

  return (
    <>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {totalCartOrdersPriceFormatted}</p>
        <Input
          label="Full Name"
          type="text"
          id="fullName"
          readOnly={formState.orderCreated}
          defaultValue={formState.enteredValues?.fullName}
        />
        <Input
          label="E-Mail Address"
          type="email"
          id="email"
          readOnly={formState.orderCreated}
          defaultValue={formState.enteredValues?.email}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          readOnly={formState.orderCreated}
          defaultValue={formState.enteredValues?.street}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            readOnly={formState.orderCreated}
            defaultValue={formState.enteredValues?.postalCode}
          />
          <Input
            label="City"
            type="text"
            id="city"
            readOnly={formState.orderCreated}
            defaultValue={formState.enteredValues?.city}
          />
        </div>
        {formState.errors?.length > 0 && (
          <ul>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p className="modal-actions">
          <Button disabled={pending} type="button" onClick={onGoBackButtonHandler} textOnly>
            Go back
          </Button>
          <Button disabled={pending || formState.orderCreated} type="submit">
            Submit Order
          </Button>
        </p>
      </form>
    </>
  );
}
