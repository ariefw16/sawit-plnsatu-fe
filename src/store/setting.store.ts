import { createSlice } from "@reduxjs/toolkit";
import { fetchSetting } from "../services/setting.service";
import { SettingState } from "../types/Setting.type";

const initialState: SettingState = {
  settings: [],
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (bulder) =>
    bulder.addCase(fetchSetting.fulfilled, (state, { payload }) => {
      state.settings = payload;
    }),
});
