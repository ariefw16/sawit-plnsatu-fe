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
    const response = await axios.post("", params);
    return response.data;
  } catch (error) {
    return handleErrorAxios(error, rejectWithValue);
  }
});
