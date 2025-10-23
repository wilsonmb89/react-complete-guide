import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartOrdersReducer from './cart-orders-store';
import productsReducer from './products-store';
import notificationReducer from './notification-store';

const rootReducers = combineReducers({
  cartOrdersState: cartOrdersReducer,
  productsState: productsReducer,
  notificationState: notificationReducer,
});

const store = configureStore({
  reducer: rootReducers,
  devTools: 'advanced-redux-action-creators'
});

export default store;
