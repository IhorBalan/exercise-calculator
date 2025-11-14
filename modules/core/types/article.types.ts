type ArticleElementType = 'text' | 'title' | 'subtitle';

export type ArticleElement = {
  type: ArticleElementType;
  content: string;
};

export type Article = {
  elements: ArticleElement[];
};
