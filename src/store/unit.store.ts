import { createSlice } from "@reduxjs/toolkit";
import {
  createUnit,
  deleteUnit,
  fetchSingleUnit,
  fetchUnit,
} from "../services/unit.service";
import { UnitState } from "../types/Unit.type";

const initialState: UnitState = {
  selectedUnit: {},
  units: [],
  totalRow: 0,
};

export const unitSlice = createSlice({
  initialState,
  name: "unit",
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUnit.fulfilled, (state, { payload }) => {
        state.units = payload.units;
        state.totalRow = payload.totalRow;
      })
      .addCase(createUnit.fulfilled, (state, { payload }) => {
        state.units.unshift(payload);
        state.totalRow!++;
      })
      .addCase(deleteUnit.fulfilled, (state, { payload }) => {
        if (payload.response.affected > 0) {
          const idx = state.units.findIndex((x) => x.id === payload.id);
          state.units.splice(idx);
          state.totalRow!--;
        }
      })
      .addCase(fetchSingleUnit.fulfilled, (state, { payload }) => {
        state.selectedUnit = payload;
      }),
});
