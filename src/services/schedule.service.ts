import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommonParams, ValidationErrors } from "../types/CommonParams.type";
import {
  ScheduleCreateType,
  ScheduleType,
  ScheduleUpdateType,
} from "../types/Schedule.type";
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

export const fetchSchedules = createAsyncThunk<
  ScheduleType[],
  { month: number; year: number },
  { rejectValue: ValidationErrors }
>("schedule/fetch", async ({ month, year }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `share-schedule?month=${month}&year=${year}`
    );
    return response.data[0];
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const updateSchedule = createAsyncThunk<
  ScheduleType,
  ScheduleUpdateType,
  { rejectValue: ValidationErrors }
>("schedule/update", async (params, { rejectWithValue }) => {
  try {
    const { id, ...body } = params;
    const response = await axios.patch(`share-schedule/${id}`, body);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
