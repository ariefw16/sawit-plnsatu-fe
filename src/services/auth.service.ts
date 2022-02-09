import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginReturnType, LoginType } from "../types/Auth.type";
import { ValidationErrors } from "../types/CommonParams.type";
import { handleErrorAxios } from "./common.service";

export const loginApp = createAsyncThunk<
  LoginReturnType,
  LoginType,
  { rejectValue: ValidationErrors }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("auth", payload);
    return response.data;
  } catch (e) {
    return handleErrorAxios(e, rejectWithValue);
  }
});
