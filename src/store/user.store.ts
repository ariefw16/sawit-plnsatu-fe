import { createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUser } from "../services/user.service";
import { UserState } from "../types/User.type";

const initialState: UserState = {
  users: [],
  selectedUser: {},
  totalRow: 0,
};

export const userSlice = createSlice({
  initialState,
  reducers: {},
  name: "user",
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.users = payload.users;
        state.totalRow = payload.totalRow;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.users.unshift(payload);
        state.totalRow!++;
      });
  },
});
