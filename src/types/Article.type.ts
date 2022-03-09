import { ArticleQuizType } from "./Quiz.type";

export interface ArticleType {
  id?: number;
  name?: string;
  article_date?: Date;
  createdBy?: { id?: number; name?: string };
  schedule?: {
    id?: number;
    name?: string;
    unit?: { id?: number; name?: string };
  };
  body?: string;
  docs?: File;
  checkins?: ArticleCheckinUsersType[];
  quizzes?: ArticleQuizType[];
  quiz_shown?: number;
}

export interface ArticleState {
  articles: ArticleType[];
  selectedArticle: ArticleType;
  totalRow?: number;
  totalRowCheckin?: number;
  checkinArticles: CheckinArticleType[];
  checkinSelected: CheckinArticleType;
}

export interface ArticleParamsType {
  limit?: number;
  page?: number;
  name?: string;
  createdById?: number;
  unitId?: number;
  article_date?: Date;
  start_date?: Date;
  end_date?: Date;
  month?: number;
  year?: number;
}

export interface ArticleFetchType {
  articles: ArticleType[];
  totalRow?: number;
}

export interface ArticleCreateType {
  body?: string;
  unit?: { id?: number; name?: string };
  article_date?: Date;
  name?: string;
  scheduleId?: number;
  docs?: File;
}

export interface ArticleCheckinFetch {
  month?: string;
  year?: string;
  status?: "all" | "read" | "unread";
  limit?: number;
  page?: number;
}

export interface ArticleCheckinReturnFetch {
  articles?: ArticleType[];
  totalRow?: number;
}

export interface CheckinArticleType extends ArticleType {
  checkedIn?: boolean;
  quizDone?: boolean;
  points?: number;
}

export interface ArticleCheckinUsersType {
  id?: number;
  points?: number;
  user?: {
    id?: number;
    name?: string;
    nik?: string;
  };
  checkedIn?: boolean;
}
