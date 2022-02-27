import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ArticleCheckinFetch, ArticleType } from "../types/Article.type";
import { ValidationErrors } from "../types/CommonParams.type";
import { handleErrorAxios } from "./common.service";

export const fetchCheckinAvailable = createAsyncThunk<
  ArticleType[],
  ArticleCheckinFetch,
  { rejectValue: ValidationErrors }
>("checkin/fetch", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get("");
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
