import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ValidationErrors } from "../types/CommonParams.type";
import { ArticleQuizCreateType, ArticleQuizType } from "../types/Quiz.type";
import { handleErrorAxios } from "./common.service";

export const saveQuestion = createAsyncThunk<
  ArticleQuizType,
  ArticleQuizCreateType,
  { rejectValue: ValidationErrors }
>("quiz/save", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.post("share-article-quiz", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});

export const deleteQuestion = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: ValidationErrors }
>("quiz/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`share-article-quiz/${id}`);
    return { id };
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
