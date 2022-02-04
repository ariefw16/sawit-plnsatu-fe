import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "../services/article.service";
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
    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      state.articles = payload.articles;
      state.totalRow = payload.totalRow;
    }),
});
