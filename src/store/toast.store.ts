import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../types/CommonParams.type";

const initialState: ToastType = {
  message: "",
  type: "success",
  open: false,
};

export const toastSlice = createSlice({
  initialState,
  name: "toast",
  reducers: {
    showToast(state, action: { payload: ToastType }) {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      state.open = true;
    },
    hideToast(state) {
      state.open = false;
    },
  },
});

export const { hideToast, showToast } = toastSlice.actions;
