export type FileType = {
  id: string;
  file_name: string;
  size: number;
  file_type: string;
  url: string;
  description: string;
};

export type HashtagType = {
  id: string;
  hashtag_name: string;
};

export type DataType = {
  id: string;
  slug: string;
  title: string;
  body: string;
  category_name: string;
  file_news: FileType[];
  hashtags: HashtagType[];
};

export type SingleReturn = {
  status: number;
  message: string;
  data: DataType;
};

export type MultiplyReturn = {
  status: number;
  message: string;
  data: DataType[];
};

//-----------------------------------------------------------------

export type CategoryType = {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
};

export type ResponseType = {
  statusCode: number;
  message: string;
  data: CategoryType[] | CategoryType;
};
