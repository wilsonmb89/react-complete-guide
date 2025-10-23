import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, isCounterVisible: true };

const counterSlice = createSlice({
  name: "CounterState",
  initialState,
  reducers: {
    increment(state, action) {
      state.counter += action.payload;
    },
    decrement(state, action) {
      state.counter -= action.payload;
    },
    toogleCounter(state) {
      state.isCounterVisible = !state.isCounterVisible;
    },
    reset(state) {
      state.counter = 0;
    }
  },
});

export default counterSlice.reducer;

export const { increment, decrement, toogleCounter, reset } = counterSlice.actions;
