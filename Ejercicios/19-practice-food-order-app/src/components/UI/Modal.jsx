import { useContext, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../store/modal-context";

export default function Modal({ ref, children, className = "" }) {
  const dialogRef = useRef(null);
  const { unmountModal } = useContext(ModalContext);

  useImperativeHandle(ref, () => ({
    close: onCloseModalHandler
  }));

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const onCloseModalHandler = () => {
    unmountModal();
  };

  return createPortal(
    <dialog ref={dialogRef} onClose={onCloseModalHandler} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
