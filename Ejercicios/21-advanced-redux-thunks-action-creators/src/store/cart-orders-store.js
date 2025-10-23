import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notification-store";

const FIREBASE_URL =
  "https://react-http-wilo23-default-rtdb.firebaseio.com/productsCart.json";

const initialState = {
  orders: [],
  isCardVisible: false,
};

const cartOrdersStoreSlice = createSlice({
  name: "CartOrdersState",
  initialState,
  reducers: {
    updateCartProducts(state, action) {
      state.orders = action.payload;
    },
    toggleVisibility(state) {
      state.isCardVisible = !state.isCardVisible;
    },
  },
});

export default cartOrdersStoreSlice.reducer;

export const { toggleVisibility, updateCartProducts } =
  cartOrdersStoreSlice.actions;

export const fetchProductsCart = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error("Error: we can't retreive order cart products");
      }

      const responseJsonData = await response.json();
      dispatch(updateCartProducts(responseJsonData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );

      dispatch(updateCartProducts([]));
    }
  };
};
