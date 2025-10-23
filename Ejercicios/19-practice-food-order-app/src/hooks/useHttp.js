import { BACKEND_BASE_PATH } from "../store/cart-orders-context";

export const useHttp = () => {
  const submitOrder = async (cartOrders, customerData) => {
    try {
      const orderBody = {
        order: {
          items: cartOrders,
          customer: customerData,
        },
      };

      const result = await fetch(`${BACKEND_BASE_PATH}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderBody),
      });

      if (result?.ok) {
        const resultJsonData = await result.json();

        return {
          message: resultJsonData.message,
          error: null,
        };
      } else {
        return {
          message: null,
          error: "Error in post fetch attempt",
        };
      }
    } catch (error) {
      return {
        message: null,
        error: "Error in post fetch attempt",
      };
    }
  };

  return { submitOrder };
};
