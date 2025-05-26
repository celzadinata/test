import { ResponseType } from "@/utils/helper/Type";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getAllCategory = async (): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/category`);
  const response = await res.json();

  return response;
};
