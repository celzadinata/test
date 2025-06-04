import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "@/utils/helper/DecodeJwt";

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  exp?: number;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        status: 401,
        message: "Tidak ada token",
        data: { isAuthenticated: false },
      });
    }

    const decoded = decodeJwt(token) as DecodedToken;
    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
      return NextResponse.json({
        status: 401,
        message: "Token kadaluwarsa",
        data: { isAuthenticated: false },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "ok",
      data: {
        isAuthenticated: true,
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch (err) {
    console.error("Gagal memeriksa token:", err);
    return NextResponse.json(
      {
        status: 500,
        message: "Terjadi kesalahan server",
        data: { isAuthenticated: false },
      },
      { status: 500 }
    );
  }
}
