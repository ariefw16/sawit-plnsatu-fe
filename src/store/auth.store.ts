import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApp } from "../services/auth.service";
import { AuthSlice } from "../types/Auth.type";

const initialState: AuthSlice = {
  access_token: "",
  refresh_code: "",
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      axios.defaults.headers.common.Authorization = "";
      state.access_token = "";
      localStorage.removeItem("key");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApp.fulfilled, (state, { payload }) => {
      state.access_token = payload.access_token;
      axios.defaults.headers.common.Authorization = `Bearer ${payload.access_token}`;
      localStorage.setItem("key", payload.access_token);
    });
  },
});

export const { logout } = authSlice.actions;
