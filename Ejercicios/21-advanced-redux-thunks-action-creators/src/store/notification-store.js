import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  status: "",
  title: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "NotificationState",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { status, title, message } = action.payload;

      state.show = true;
      state.status = status;
      state.title = title;
      state.message = message;
    },
    hideNotification: (state) => {
      state.show = false;
      state.status = "";
      state.title = "";
      state.message = "";
    },
  },
});

export default notificationSlice.reducer;

export const { showNotification, hideNotification } = notificationSlice.actions;
