import { loginUser } from "@/utils/backend/auth";
import { decodeJwt } from "@/utils/helper/DecodeJwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await loginUser(body);

    if (response.status !== 200 || !response.data?.token) {
      return NextResponse.json({
        status: response.status,
        message: response.message,
      });
    }

    const token = response.data.token;
    const decoded = decodeJwt(token);

    let maxAge = 60 * 60;

    if (decoded?.exp && decoded?.iat) {
      maxAge = decoded.exp - decoded.iat;
    }

    const res = NextResponse.json({
      status: response.status,
      message: response.message,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Gagal login: ", err);
    return NextResponse.json(
      { error: `Terjadi kesalahan server: ${err}` },
      { status: 500 }
    );
  }
}
