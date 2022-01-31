import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import {
  FetchReturnType,
  UnitCreateType,
  UnitFetchParams,
  UnitType,
  UnitUpdateType,
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

export const deleteUnit = createAsyncThunk<
  any,
  { id: number },
  { rejectValue: ValidationErrors }
>("unit/delete", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`unit/${params.id}`);
    return { response: response.data, id: params.id };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const fetchSingleUnit = createAsyncThunk<
  UnitType,
  { id: number },
  { rejectValue: ValidationErrors }
>("unit/singleFetch", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`unit?id=${id}`);
    return response.data[0][0];
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const updateUnit = createAsyncThunk<
  UnitType,
  UnitUpdateType,
  { rejectValue: ValidationErrors }
>("unit/update", async (params, { rejectWithValue }) => {
  try {
    if (
      (params.parent &&
        (!("id" in params.parent) || params.parent.id === undefined)) ||
      !params.parent
    ) {
      params.parent = undefined;
    }
    const response = await axios.patch(`unit/${params.id}`, params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
