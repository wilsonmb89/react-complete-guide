// Para React < 19 -> ocurre por que en las versiones viejas de React no era posible pasar el ref como una propiedad del componente en prop-drilling
/* import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ children }, ref) => { // Uso de forwardRef para hacer prop drilling del ref
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
  }));

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal; */

// Para react > 19
import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import Button from '../Button';

const Modal = ({ children, ref, buttonCaption }) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
  }));

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
