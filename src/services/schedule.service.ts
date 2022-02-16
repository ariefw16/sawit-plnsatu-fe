import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import {
  ScheduleCreateType,
  ScheduleType,
  ScheduleUpdateType,
} from "../types/Schedule.type";
import { handleErrorAxios } from "./common.service";
import moment from "moment";

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

export const deleteSchedule = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: ValidationErrors }
>("schedule/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`share-schedule/${id}`);
    return id;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const fetchScheduleByDate = createAsyncThunk<
  ScheduleType,
  { schedule_date: Date },
  { rejectValue: ValidationErrors }
>("schedule/fetchByDate", async ({ schedule_date }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `share-schedule?schedule_date=${moment(schedule_date).format(
        "YYYY-MM-DD"
      )}`
    );
    return response.data[0][0];
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const fetchAvailableScheduleDate = createAsyncThunk<
  ScheduleType[],
  { month: number; year: number; scheduleId: number },
  { rejectValue: ValidationErrors }
>("schedule/available-date", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `share-schedule/available-date?month=${params.month}&year=${params.year}&scheduleId=${params.scheduleId}`
    );
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
