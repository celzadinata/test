import { AuthResponse } from "@/utils/helper/TypeHelper";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const registerUser = async (payload: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await fetch(`${baseURL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();
  return response;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();
  return response;
};
