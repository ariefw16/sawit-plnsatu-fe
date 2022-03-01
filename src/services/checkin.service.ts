import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ArticleCheckinFetch,
  ArticleCheckinReturnFetch,
} from "../types/Article.type";
import { ValidationErrors } from "../types/CommonParams.type";
import { handleErrorAxios } from "./common.service";

export const fetchCheckinAvailable = createAsyncThunk<
  ArticleCheckinReturnFetch,
  ArticleCheckinFetch,
  { rejectValue: ValidationErrors }
>("checkin/fetch", async (params, { rejectWithValue }) => {
  try {
    const { month, year, limit, page = 0, status = "all" } = params;
    const response = await axios.get(
      `share-article-checkin?month=${month}&year=${year}&limit=${limit}&page=${page}&status=${status}`
    );
    return { articles: response.data[0], totalRow: response.data[1] };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
