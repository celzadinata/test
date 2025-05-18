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

export type ResponseType = {
  status: number;
  message: string;
  data: DataType[];
};
