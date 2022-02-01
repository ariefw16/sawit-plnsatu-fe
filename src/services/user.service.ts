import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommonParams, ValidationErrors } from "../types/CommonParams.type";
import { FetchUserReturnType } from "../types/User.type";
import { handleErrorAxios } from "./common.service";

export const fetchUser = createAsyncThunk<
  FetchUserReturnType,
  CommonParams,
  { rejectValue: ValidationErrors }
>("user/fetch", async (params, { rejectWithValue }) => {
  try {
    const { page = 0, limit, q } = params;
    const response = await axios.get(
      `users?page=${page}&limit=${limit}&q=${q}`
    );
    return { users: response.data[0], totalRow: response.data[1] };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
