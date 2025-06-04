const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const newsComment = async (payload: {
  news_id: string;
  comment: string;
  token: string;
}): Promise<any> => {
  const { token, ...restPayload } = payload;

  const res = await fetch(`${baseURL}/api/news/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restPayload),
  });

  const response = await res.json();
  return response;
};
