import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { newsComment } from "@/utils/backend/comment";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("token")?.value;
    const authHeader = req.headers.get("Authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = bearerToken || cookieToken;

    if (!token) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized: Token tidak ditemukan",
      });
    }

    const body = await req.json();
    const { news_id, comment } = body;

    if (!news_id || !comment) {
      return NextResponse.json({
        status: 400,
        message: "news_id dan comment diperlukan",
      });
    }

    const response = await newsComment({ news_id, comment, token });

    if (response.statusCode !== 200) {
      return NextResponse.json({
        status: response.statusCode,
        message: response.message,
      });
    }

    return NextResponse.json({
      status: response.statusCode,
      message: response.message || "Komentar berhasil ditambahkan",
    });
  } catch (err) {
    console.error("Gagal memproses komentar:", err);
    return NextResponse.json(
      { status: 500, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
