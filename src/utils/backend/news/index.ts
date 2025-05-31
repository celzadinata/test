import { ResponseType } from "@/utils/helper/TypeHelper";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getAllNews = async (): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/news`);
  const response = await res.json();

  return response;
};

export const getNewsById = async (id: string): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/news/${id}`);
  const response = await res.json();

  return response;
};

export const getNewsByTitle = async (
  title: string,
  page?: string,
  limit?: string
): Promise<ResponseType> => {
  const res = await fetch(
    `${baseURL}/api/news?title=${title}&page=${page}&limit=${limit}`
  );
  const response = await res.json();

  return response;
};

export const getAllRandomNews = async (
  limit: number
): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/news?random=true&limit=${limit}`);
  const response = await res.json();

  return response;
};

export const getNewsByCategory = async (
  categoryId: string,
  page?: string,
  limit?: string,
  random?: string
): Promise<ResponseType> => {
  const res = await fetch(
    `${baseURL}/api/news?category_id=${categoryId}&sort=asc&page=${page}&limit=${limit}&random=${random}`
  );
  const response = await res.json();

  return response;
};
