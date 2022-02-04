import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { articleSlice } from "./store/article.store";
import { scheduleSlice } from "./store/schedule.store";
import { toastSlice } from "./store/toast.store";
import { unitSlice } from "./store/unit.store";
import { userSlice } from "./store/user.store";

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    unit: unitSlice.reducer,
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
    article: articleSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
