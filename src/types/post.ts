export interface PostMetadata {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  readingTime?: string;
  author?: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
  htmlContent?: string;
}
