import { getAllNews, getNewsById, getNewsByTitle } from "@/utils/backend/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const pageValue = page || "1";
  const limitValue = limit || "0";

  if (id) {
    const response = await getNewsById(id);
    if (response.statusCode === 200) {
      return NextResponse.json({
        status: response.statusCode,
        message: response.message,
        data: response.data,
      });
    }

    return NextResponse.json({
      status: response.statusCode,
      message: response.message,
    });
  }

  if (title) {
    const response = await getNewsByTitle(title, pageValue, limitValue);
    if (response.statusCode === 200) {
      return NextResponse.json({
        status: response.statusCode,
        message: response.message,
        data: response.data,
      });
    }

    return NextResponse.json({
      status: response.statusCode,
      message: response.message,
    });
  }

  const response = await getAllNews();

  return NextResponse.json({
    status: response.statusCode,
    message: response.message,
    data: response.data,
  });
}
