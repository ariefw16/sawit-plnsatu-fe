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

export const saveSetting = createAsyncThunk<
  SettingType[],
  SettingType[],
  { rejectValue: ValidationErrors }
>("setting/save", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("setting", { settings: data });
    if (response.data) return data;
    else throw new Error("Not Success");
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
