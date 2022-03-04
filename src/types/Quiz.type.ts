export interface ArticleQuizType {
  id?: number;
  question?: string;
  articleId?: number;
  correctChoice?: ArticleQuizChoiceType;
  choices?: ArticleQuizChoiceType[];
}

export interface ArticleQuizChoiceType {
  id?: number;
  quizId?: number;
  name?: string;
  isCorrect?: boolean;
}

export interface ArticleQuizCreateType {
  question: string;
  articleId: number;
  choices?: ArticleQuizChoiceType[];
  correctChoice?: ArticleQuizChoiceType;
}
