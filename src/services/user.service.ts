import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommonParams, ValidationErrors } from "../types/CommonParams.type";
import {
  FetchUserReturnType,
  UserCreateType,
  UserType,
  UserUpdateType,
} from "../types/User.type";
import { handleErrorAxios } from "./common.service";

export const fetchUser = createAsyncThunk<
  FetchUserReturnType,
  CommonParams,
  { rejectValue: ValidationErrors }
>("user/fetch", async (params, { rejectWithValue }) => {
  try {
    const { page = 0, limit, q = "" } = params;
    const response = await axios.get(
      `users?page=${page}&limit=${limit}&q=${q}`
    );
    return { users: response.data[0], totalRow: response.data[1] };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const createUser = createAsyncThunk<
  UserType,
  UserCreateType,
  { rejectValue: ValidationErrors }
>("user/create", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.post("users", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const deleteUser = createAsyncThunk<
  any,
  { id: number },
  { rejectValue: ValidationErrors }
>("user/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`users/${id}`);
    return id;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const fetchSingleUser = createAsyncThunk<
  UserType,
  { id: number },
  { rejectValue: ValidationErrors }
>("user/singleFetch", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`users?id=${id}`);
    return response.data[0][0];
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const updateUser = createAsyncThunk<
  UserType,
  UserUpdateType,
  { rejectValue: ValidationErrors }
>("user/update", async (params, { rejectWithValue }) => {
  try {
    const { id, ...restParams } = params;
    const response = await axios.patch(`users/${id}`, restParams);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
