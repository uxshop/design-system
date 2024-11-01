export interface IArticle {
  name: string;
  url: string;
}

export interface PageHelperArticlesProps {
  title?: string;
  articles?: IArticle[];
}
