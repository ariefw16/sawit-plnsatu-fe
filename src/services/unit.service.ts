import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValidationErrors } from "../types/CommonParams.type";
import { FetchReturnType, UnitFetchParams } from "../types/Unit.type";
import { handleErrorAxios } from "./common.service";

export const fetchUnit = createAsyncThunk<
  FetchReturnType,
  UnitFetchParams,
  { rejectValue: ValidationErrors }
>("unit/fetch", async (params, { rejectWithValue }) => {
  const { page = 0, limit, name, parentId, q, stiUnitId } = params;
  try {
    return { unit: {}, units: [], totalRow: 0 };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
