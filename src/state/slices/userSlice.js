import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logined: false,
  userName: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.logined = true;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.logined = false;
      state.userName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
