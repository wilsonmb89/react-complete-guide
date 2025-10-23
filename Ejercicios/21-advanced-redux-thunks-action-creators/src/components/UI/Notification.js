import { useDispatch, useSelector } from "react-redux";

import classes from "./Notification.module.css";
import { useEffect } from "react";
import { hideNotification } from "../../store/notification-store";

const Notification = () => {
  const { show, title, status, message } = useSelector(
    (state) => state.notificationState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let showDelayTimeout = null;
    if (show) {
      showDelayTimeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 1500);
    }

    return () => {
      if (showDelayTimeout) {
        clearTimeout(showDelayTimeout);
      }
    };
  }, [dispatch, show]);

  let specialClasses = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <>
      {show && (
        <section className={cssClasses}>
          <h2>{title}</h2>
          <p>{message}</p>
        </section>
      )}
    </>
  );
};

export default Notification;
