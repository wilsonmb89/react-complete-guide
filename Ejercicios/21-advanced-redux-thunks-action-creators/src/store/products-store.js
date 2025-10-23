import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notification-store";
import { DUMMY_PRODUCTS } from "../dummy_products";

const FIREBASE_URL =
  "https://react-http-wilo23-default-rtdb.firebaseio.com/products.json";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "ProductsState",
  initialState,
  reducers: {
    bulkProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const { bulkProducts } = productsSlice.actions;

export const fetchProductsData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error("Error: we can't retreive saved products");
      }

      const responseJsonData = await response.json();
      dispatch(bulkProducts(responseJsonData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );

      dispatch(bulkProducts(DUMMY_PRODUCTS));
    }
  };
};
