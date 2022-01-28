import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import {
  FetchReturnType,
  UnitCreateType,
  UnitFetchParams,
  UnitType,
} from "../types/Unit.type";
import { handleErrorAxios } from "./common.service";

export const fetchUnit = createAsyncThunk<
  FetchReturnType,
  UnitFetchParams,
  { rejectValue: ValidationErrors }
>("unit/fetch", async (params, { rejectWithValue }) => {
  const { page = 0, limit, name, parentId, q, stiUnitId } = params;
  try {
    const response = await axios.get(`unit?page=${page}&limit=${limit}`);
    return { unit: {}, units: response.data[0], totalRow: response.data[1] };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const createUnit = createAsyncThunk<
  UnitType,
  UnitCreateType,
  { rejectValue: ValidationErrors }
>("unit/create", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.post("unit", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
