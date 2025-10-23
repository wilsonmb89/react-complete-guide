import { createContext, useReducer } from "react";

export const BACKEND_BASE_PATH = "http://localhost:3000";

const cartOrdersContextInitialValue = {
  cartOrders: [],
  // eslint-disable-next-line no-unused-vars
  addCartOrder: (order) => {},
  // eslint-disable-next-line no-unused-vars
  removeCartOrder: (order) => {},
  resetCartOrders: () => {},
};

export const CartOrdersContext = createContext(cartOrdersContextInitialValue);

const addOrderReduceState = (state, order) => {
  const isOrdered = state.some((item) => item.id === order.id);

  if (isOrdered) {
    return state.map((orderedItem) => {
      if (orderedItem.id === order.id) {
        orderedItem = {
          ...orderedItem,
          count: orderedItem.count + 1,
        };
      }

      return orderedItem;
    });
  } else {
    return [
      {
        ...order,
        price: Number(order.price),
        count: 1,
      },
      ...state,
    ];
  }
};

const removeOrderReduceState = (state, order) => {
  if (order.count - 1 <= 0) {
    return state.filter((item) => item.id !== order.id);
  } else {
    return state.map((item) => {
      if (item.id === order.id) {
        item = {
          ...item,
          count: item.count - 1,
        };
      }

      return item;
    });
  }
};

const cartOrdersReducerHandler = (state, action) => {
  const { type, payload } = action;

  if (type === "ADD") {
    return addOrderReduceState(state, payload);
  } else if (type === "REMOVE") {
    return removeOrderReduceState(state, payload);
  } else if (type === "RESET") {
    return [];
  }

  return state;
};

export default function CartOrdersContextProvider({ children }) {
  const [cartOrders, cartOrdersDispatch] = useReducer(
    cartOrdersReducerHandler,
    []
  );

  const addCartOrder = (order) => {
    const dispatchValue = {
      type: "ADD",
      payload: order,
    };
    cartOrdersDispatch(dispatchValue);
  };

  const removeCartOrder = (order) => {
    const dispatchValue = {
      type: "REMOVE",
      payload: order,
    };
    cartOrdersDispatch(dispatchValue);
  };

  const resetCartOrders = () => {
    const dispatchValue = {
      type: "RESET",
      payload: null,
    };
    cartOrdersDispatch(dispatchValue);
  };

  const mealsContextProviderValue = {
    cartOrders,
    addCartOrder,
    removeCartOrder,
    resetCartOrders
  };

  return (
    <CartOrdersContext.Provider value={mealsContextProviderValue}>
      {children}
    </CartOrdersContext.Provider>
  );
}
