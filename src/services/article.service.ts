import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ArticleFetchType, ArticleParamsType } from "../types/Article.type";
import { ValidationErrors } from "../types/CommonParams.type";
import { handleErrorAxios } from "./common.service";

export const fetchArticles = createAsyncThunk<
  ArticleFetchType,
  ArticleParamsType,
  { rejectValue: ValidationErrors }
>("article/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 0,
      limit = 0,
      article_date,
      month,
      year,
      start_date,
      end_date,
    } = params;
    let query = "";
    if (article_date) query += `&article_date=${article_date}`;
    if (month) query += `&month=${month}`;
    if (year) query += `&year=${year}`;
    if (start_date) query += `&start_date=${start_date}`;
    if (end_date) query += `&end_date=${end_date}`;
    const response = await axios.get(
      `share-article?page=${page}&limit=${limit}${query}`
    );
    return { articles: response.data[0], totalRow: response.data[1] };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
