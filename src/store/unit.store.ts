import { createSlice } from "@reduxjs/toolkit";
import { fetchUnit } from "../services/unit.service";

const initialState = {};

export const unitSlice = createSlice({
  initialState,
  name: "unit",
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchUnit.fulfilled, (state, { payload }) => {}),
});
