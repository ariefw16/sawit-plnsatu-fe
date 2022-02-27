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
}

export interface ArticleState {
  articles: ArticleType[];
  selectedArticle: ArticleType;
  totalRow?: number;
  totalRowCheckin?: number;
  checkinArticles: ArticleType[];
  checkinSelected: ArticleType;
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
}
