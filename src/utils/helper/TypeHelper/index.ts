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
export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type CategoryType = {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
};

export type HashtagType = {
  id: string;
  hashtag_name: string;
  news_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};

export type FileType = {
  id: string;
  file_name: string;
  size: number;
  file_type: string;
  url: string;
  news_id: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type NewsData = {
  id: string;
  title: string;
  slug: string;
  body: string;
  category_id: string;
  created_by: string;
  updated_by: string;
  published: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tags: HashtagType[];
  files: FileType[];
};

export type NewsType = {
  current_page: number;
  data: NewsData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type ResponseType = {
  statusCode: number;
  message: string;
  data: CategoryType[] | CategoryType | NewsType[] | NewsType;
};

export type AuthResponse = {
  status: number;
  message: string;
  data?: {
    token: string;
  };
};
