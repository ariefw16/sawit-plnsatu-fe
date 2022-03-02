import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ArticleCheckinFetch,
  ArticleCheckinReturnFetch,
  ArticleType,
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

export const fetchCheckinArticle = createAsyncThunk<
  ArticleType,
  { id: number },
  { rejectValue: ValidationErrors }
>("checkin/article", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`share-article-checkin?id=${id}`);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const checkinArticle = createAsyncThunk<
  ArticleType,
  { id: number },
  { rejectValue: ValidationErrors }
>("checkin/submit", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.post("share-article-checkin", {
      articleId: id,
    });
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
