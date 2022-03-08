export interface ArticleQuizType {
  id?: number;
  question?: string;
  articleId?: number;
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
  articleId?: number;
  choices?: ArticleQuizChoiceType[];
}

export interface CheckinQuizCreateType {
  articleId?: number;
  questions?: CheckinQuizQuestionCreateType[];
}

export interface CheckinQuizQuestionCreateType {
  quizId?: number;
  question?: string;
  choices?: CheckinQuizChoiceCreateType[];
}

export interface CheckinQuizChoiceCreateType {
  name?: string;
  choiceRelId?: number;
  isChoosen?: boolean;
}
