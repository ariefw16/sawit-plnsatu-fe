import { createSlice } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  fetchArticles,
} from "../services/article.service";
import { ArticleState } from "../types/Article.type";

const initialState: ArticleState = {
  articles: [],
  selectedArticle: {},
  totalRow: 0,
};

export const articleSlice = createSlice({
  initialState,
  name: "article",
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchArticles.fulfilled, (state, { payload }) => {
        state.articles = payload.articles;
        state.totalRow = payload.totalRow;
      })
      .addCase(createArticle.fulfilled, (state, { payload }) => {
        state.selectedArticle = payload;
      })
      .addCase(deleteArticle.fulfilled, (state, { payload }) => {
        const idx = state.articles.findIndex((x) => x.id === payload.id);
        state.articles.splice(idx);
      }),
});
