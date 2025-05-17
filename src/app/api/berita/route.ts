import { getAllNews, getNewsDetail } from "@/utils/DummyApi/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  if (id && slug) {
    const newsDetail = await getNewsDetail(id, slug);
    if (newsDetail) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: newsDetail,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Product not found",
      data: {},
    });
  }

  const news = await getAllNews();

  return NextResponse.json({ status: 200, message: "Success", data: news });
}
