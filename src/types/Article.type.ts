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
}

export interface ArticleState {
  articles: ArticleType[];
  selectedArticle: ArticleType;
  totalRow?: number;
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
