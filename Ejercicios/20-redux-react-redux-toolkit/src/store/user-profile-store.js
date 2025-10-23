import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  email: null,
};

const userProfileSlice = createSlice({
  name: "UserProfileState",
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      state.email = null;
    },
  },
});

export default userProfileSlice.reducer;

export const { login, logout } = userProfileSlice.actions;
