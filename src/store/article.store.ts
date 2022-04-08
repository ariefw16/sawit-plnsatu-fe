import { createSlice } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  fetchSingleArticle,
  getFileArticle,
  updateArticle,
  updateQuizShownArticle,
} from "../services/article.service";
import {
  checkinArticle,
  fetchCheckinArticle,
  fetchCheckinAvailable,
  submitCheckinQuiz,
} from "../services/checkin.service";
import {
  deleteQuestion,
  saveQuestion,
  updateQuestion,
} from "../services/quiz.service";
import { ArticleState, ArticleType } from "../types/Article.type";

const initialState: ArticleState = {
  articles: [],
  selectedArticle: {},
  totalRow: 0,
  totalRowCheckin: 0,
  checkinArticles: [],
  checkinSelected: {},
};

export const articleSlice = createSlice({
  initialState,
  name: "article",
  reducers: {
    setSelectedArticle(state, { payload }) {
      const idx = state.articles.findIndex((x) => x.id === payload.id);
      state.selectedArticle = state.articles[idx];
    },
  },
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
      })
      .addCase(fetchSingleArticle.fulfilled, (state, { payload }) => {
        state.selectedArticle = payload;
        if (payload.picPath) state.selectedArticle.hasDocs = true;
      })
      .addCase(updateArticle.fulfilled, (state, { payload }) => {
        // const idx = state.articles.findIndex((x) => x.id === payload.id);
        const prevData = Object.assign(
          state.selectedArticle as ArticleType,
          payload
        );
        state.selectedArticle = prevData;
        // state.articles[idx] = payload;
      })
      .addCase(fetchCheckinAvailable.fulfilled, (state, { payload }) => {
        state.checkinArticles = payload.articles!;
        state.totalRowCheckin = payload.totalRow;
      })
      .addCase(fetchCheckinArticle.fulfilled, (state, { payload }) => {
        state.checkinSelected = payload;
        console.log(payload);
      })
      .addCase(checkinArticle.fulfilled, (state, { payload }) => {
        state.checkinSelected.checkedIn = true;
        state.checkinSelected.points = payload.points;
      })
      .addCase(updateQuizShownArticle.fulfilled, (state, { payload }) => {
        state.selectedArticle.quiz_shown = payload.quiz_shown;
      })
      .addCase(deleteQuestion.fulfilled, (state, { payload }) => {
        const idx = state.selectedArticle.quizzes?.findIndex(
          (x) => x.id === payload.id
        );
        if (idx && idx >= 0) state.selectedArticle.quizzes?.splice(idx, 1);
      })
      .addCase(saveQuestion.fulfilled, (state, { payload }) => {
        state.selectedArticle.quizzes?.push(payload);
      })
      .addCase(updateQuestion.fulfilled, (state, { payload }) => {
        const idx = state.selectedArticle.quizzes?.findIndex(
          (x) => x.id === payload.id
        );
        if (idx! > -1) {
          state.selectedArticle.quizzes?.splice(idx!, 1, payload);
        }
      })
      .addCase(submitCheckinQuiz.fulfilled, (state, { payload }) => {
        state.checkinSelected.quizzes = payload;
        state.checkinSelected.quizDone = true;
      })
      .addCase(getFileArticle.fulfilled, (state, { payload }) => {
        state.selectedArticle.docs = payload;
      }),
});

export const { setSelectedArticle } = articleSlice.actions;
