import { ResponseType } from "@/utils/helper/Type";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getAllCategory = async (): Promise<ResponseType> => {
  const res = await fetch(`${baseURL}/api/category`, {
    // Tidak perlu cache: "no-store" jika tidak butuh data super fresh
    next: { tags: ["category"] },
  });

  const response = await res.json();

  return response;
};
