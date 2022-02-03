import { createSlice } from "@reduxjs/toolkit";
import { createSchedule } from "../services/schedule.service";
import { ScheduleState } from "../types/Schedule.type";

const initialState: ScheduleState = {
  schedules: [],
  selectedSchedule: {},
};

export const scheduleSlice = createSlice({
  initialState,
  name: "schedule",
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(createSchedule.fulfilled, (state, { payload }) => {
      state.schedules.unshift(payload);
    }),
});
