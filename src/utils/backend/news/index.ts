import { ResponseType } from "@/utils/helper/TypeHelper";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getAllNews = async (): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/news`);
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

export const getNewsNew = async () => {
  const res = await fetch(`${baseURL}/api/news`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const getNewsById = async (id: string): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/news/${id}`);
  const response = await res.json();

  return response;
};

export const getNewsByCategory = async (
  categoryId: string
): Promise<ResponseType> => {
  const res = await fetch(
    `${baseURL}/api/news?category_id=${categoryId}&sort=asc`
  );
  const response = await res.json();

  return response;
};
