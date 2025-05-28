import { getAllNews, getNewsById } from "@/utils/backend/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

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

  const response = await getAllNews();

  return NextResponse.json({
    status: response.statusCode,
    message: response.message,
    data: response.data,
  });
}
