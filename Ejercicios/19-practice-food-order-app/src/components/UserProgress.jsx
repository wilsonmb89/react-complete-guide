import { useRef, useState } from "react";

import Modal from "./UI/Modal";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function UserProgress() {
  const [step, setStep] = useState("SUMMARY");

  const modalRef = useRef(null);

  const onClickCloseButtonHandler = () => {
    modalRef.current.close();
  };

  const content =
    step === "SUMMARY" ? (
      <Cart
        onClickCheckout={() => setStep('CHECKOUT')}
        onCloseSummary={onClickCloseButtonHandler}
      />
    ) : (
      <Checkout onGoBack={() => setStep('SUMMARY')} />
    );

  return (
    <Modal ref={modalRef} className="cart">
      {content}
    </Modal>
  );
}
