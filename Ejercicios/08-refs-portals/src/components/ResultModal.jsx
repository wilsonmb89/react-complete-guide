import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = ({ ref, targetTime, remainingTime, onReset }) => {
  const dialogRef = useRef(null);

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal()
  }), []);

  return createPortal(
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
      <h2>You { userLost ? 'lost' : 'win' }</h2>
      {!userLost && <h2>Your Score: { score }</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timmer with { formattedRemainingTime } seconds left.</p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('overlay-root')
  );
};

export default ResultModal;
