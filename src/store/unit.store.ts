import { createSlice } from "@reduxjs/toolkit";
import { fetchUnit } from "../services/unit.service";
import { UnitState } from "../types/Unit.type";

const initialState: UnitState = {
  unit: {},
  units: [],
  totalRow: 0,
};

export const unitSlice = createSlice({
  initialState,
  name: "unit",
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchUnit.fulfilled, (state, { payload }) => {
      state.units = payload.units;
      state.totalRow = payload.totalRow;
    }),
});
