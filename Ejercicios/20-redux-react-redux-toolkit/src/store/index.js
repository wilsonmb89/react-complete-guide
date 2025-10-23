/* import { createStore } from "redux"; */
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import counterSliceReducer from "./counter-store";
import userProfileStateReducer from "./user-profile-store";

const rootReducer = combineReducers({
  counterState: counterSliceReducer,
  userProfileState: userProfileStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: { name: "counter-app-demo" },
});

export default store;

/* export const COUNTER_REDUCER_TYPES = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  TOGGLE_COUNTER: "TOGGLE_COUNTER",
};

const counterReducer = (store = initialState, action) => {
  const { type, payload } = action;

  if (type === COUNTER_REDUCER_TYPES.INCREMENT) {
    return {
      ...store,
      counter: store.counter + payload,
    };
  }

  if (type === COUNTER_REDUCER_TYPES.DECREMENT) {
    return {
      ...store,
      counter: store.counter - payload,
    };
  }

  if (type === COUNTER_REDUCER_TYPES.TOGGLE_COUNTER) {
    return {
      ...store,
      isCounterVisible: !store.isCounterVisible,
    };
  }

  return store;
};

const store = createStore(counterReducer);

export default store; */
