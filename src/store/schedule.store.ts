import { createSlice } from "@reduxjs/toolkit";
import {
  createSchedule,
  deleteSchedule,
  fetchScheduleByDate,
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
    resetSelectedSchedule: (state) => {
      state.selectedSchedule = {};
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
      })
      .addCase(deleteSchedule.fulfilled, (state, { payload }) => {
        if (state.selectedSchedule.id === payload.id)
          state.selectedSchedule = {
            name: "UNKNOWN",
            unit: { id: 0, name: "UNKNOWN" },
          };
        const idx = state.schedules.findIndex((x) => x.id === payload.id);
        state.schedules.splice(idx);
      })
      .addCase(fetchScheduleByDate.fulfilled, (state, { payload }) => {
        state.selectedSchedule = payload || {};
      }),
});

export const { setSelectedSchedule, resetSelectedSchedule } =
  scheduleSlice.actions;
