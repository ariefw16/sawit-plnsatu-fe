import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import { ScheduleCreateType, ScheduleType } from "../types/Schedule.type";
import { handleErrorAxios } from "./common.service";

export const createSchedule = createAsyncThunk<
  ScheduleType,
  ScheduleCreateType,
  { rejectValue: ValidationErrors }
>("schedule/create", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.post("share-schedule", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
