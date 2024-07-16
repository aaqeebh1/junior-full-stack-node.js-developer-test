import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    userData: {
        firstName: "",
        lastName: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
