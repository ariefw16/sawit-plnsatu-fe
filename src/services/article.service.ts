import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import {
  ArticleCreateType,
  ArticleFetchType,
  ArticleParamsType,
  ArticleType,
} from "../types/Article.type";
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

export const createArticle = createAsyncThunk<
  ArticleType,
  ArticleCreateType,
  { rejectValue: ValidationErrors }
>("article/create", async (props, { rejectWithValue }) => {
  try {
    const params = new FormData();
    params.append("name", props.name || "");
    params.append("body", props.body || "");
    params.append(
      "article_date",
      moment(props.article_date).format("YYYY-MM-DD")
    );
    params.append("scheduleId", String(props.scheduleId));
    if (props.docs) params.append("docs", props.docs);

    const response = await axios.post("share-article", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const deleteArticle = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: ValidationErrors }
>("article/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`share-article/${id}`);
    return { id };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const fetchSingleArticle = createAsyncThunk<
  ArticleType,
  { id: number },
  { rejectValue: ValidationErrors }
>("article/singleFetch", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`share-article?id=${id}`);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const updateArticle = createAsyncThunk<
  ArticleType,
  ArticleType,
  { rejectValue: ValidationErrors }
>("article/update", async (props, { rejectWithValue }) => {
  try {
    const { id, ...params } = props;
    const response = await axios.patch(`share-article/${id}`, params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const updateQuizShownArticle = createAsyncThunk<
  ArticleType,
  { id: number; shown: number },
  { rejectValue: ValidationErrors }
>("article/questionshown", async ({ id, shown }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`share-article/${id}`, {
      quiz_shown: shown,
    });
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
