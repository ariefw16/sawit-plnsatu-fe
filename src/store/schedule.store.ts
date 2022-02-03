import { createSlice } from "@reduxjs/toolkit";
import {
  createSchedule,
  fetchSchedules,
  updateSchedule,
} from "../services/schedule.service";
import { ScheduleState } from "../types/Schedule.type";

const initialState: ScheduleState = {
  schedules: [],
  selectedSchedule: {},
};

export const scheduleSlice = createSlice({
  initialState,
  name: "schedule",
  reducers: {
    setSelectedSchedule: (state, { payload }) => {
      const idx = state.schedules.findIndex((x) => x.id === payload.id);
      state.selectedSchedule = state.schedules[idx];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createSchedule.fulfilled, (state, { payload }) => {
        state.schedules.unshift(payload);
      })
      .addCase(fetchSchedules.fulfilled, (state, { payload }) => {
        state.schedules = payload;
      })
      .addCase(updateSchedule.fulfilled, (state, { payload }) => {
        state.selectedSchedule = payload;
        const idx = state.schedules.findIndex((x) => x.id === payload.id);
        state.schedules[idx] = payload;
      }),
});

export const { setSelectedSchedule } = scheduleSlice.actions;
