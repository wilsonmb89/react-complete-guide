import { useDispatch, useSelector } from "react-redux";

import { updateCartProducts } from "../store/cart-orders-store";
import { showNotification } from "../store/notification-store";

const FIREBASE_URL =
  "https://react-http-wilo23-default-rtdb.firebaseio.com/productsCart.json";

// ESTO PUEDE CONVERTIRSE A UN THUNK!! 
export const useCartProducts = () => {
  const orders = useSelector((state) => state.cartOrdersState.orders);
  const dispatch = useDispatch();

  const buildOrdersAddingItem = (productItem) => {
    // let updatedOrders = JSON.parse(JSON.stringify(orders));
    let updatedOrders = structuredClone(orders);

    if (orders.some((order) => order.id === productItem.id)) {
      updatedOrders = updatedOrders.map((order) => {
        if (order.id === productItem.id) {
          const newQuantity = order.quantity + 1;

          order.quantity = newQuantity;
          order.total = order.price * newQuantity;
        }

        return order;
      });
    } else {
      updatedOrders = [
        {
          ...productItem,
          quantity: 1,
          total: productItem.price * 1,
        },
        ...updatedOrders,
      ];
    }

    return updatedOrders;
  };

  const buildOrderRemovingItem = (productItem) => {
    // let updatedOrders = JSON.parse(JSON.stringify(orders));
    let updatedOrders = structuredClone(orders);
    const foundStateItem = orders.find((order) => order.id === productItem.id);

    if (foundStateItem) {
      if (foundStateItem.quantity === 1) {
        updatedOrders = updatedOrders.filter(
          (order) => order.id !== productItem.id
        );
      } else {
        updatedOrders = updatedOrders.map((order) => {
          if (order.id === productItem.id) {
            const newQuantity = order.quantity - 1;

            order.quantity = newQuantity;
            order.total = order.price * newQuantity;
          }

          return order;
        });
      }
    }

    return updatedOrders;
  };

  const fetchAndSaveStore = async (updatedOrders) => {
    try {
      const result = await fetch(FIREBASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrders),
      });

      if (result.ok) {
        dispatch(updateCartProducts(updatedOrders));
        dispatch(
          showNotification({
            status: "success",
            title: "Success",
            message: "Operation was successful :)",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Operation was not successful :(",
        })
      );
    }
  };

  const addItem = (productItem) => {
    const updatedOrders = buildOrdersAddingItem(productItem);
    // update via firebase
    fetchAndSaveStore(updatedOrders);
  };

  const removeItem = (productItem) => {
    const updatedOrders = buildOrderRemovingItem(productItem);
    // update via firebase
    fetchAndSaveStore(updatedOrders);
  };

  return { addItem, removeItem };
};
