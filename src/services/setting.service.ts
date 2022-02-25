import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import { SettingType } from "../types/Setting.type";
import { handleErrorAxios } from "./common.service";

export const fetchSetting = createAsyncThunk<
  SettingType[],
  {},
  { rejectValue: ValidationErrors }
>("setting/fetch", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get("setting");
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
