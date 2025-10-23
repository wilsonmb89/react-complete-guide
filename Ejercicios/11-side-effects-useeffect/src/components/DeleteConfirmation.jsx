import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const REMAINING_TIME = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const idleTimeout = setTimeout(() => {
      onConfirm();
    }, REMAINING_TIME);

    return () => {
      clearTimeout(idleTimeout);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Se migra a un componente aparte por su alta renderizacion en su timer */}
      <ProgressBar maxTime={REMAINING_TIME} />
    </div>
  );
}
