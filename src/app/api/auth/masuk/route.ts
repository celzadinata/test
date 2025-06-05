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

    console.log("INI DECODED: ", decoded);

    if (decoded.role === "ADMIN") {
      return NextResponse.json({
        status: 405,
        message: "Access denied for this account",
      });
    }

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
      secure: false,
      maxAge,
      path: "/",
      sameSite: "lax",
    });

    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Origin", "http://10.10.103.160:3000");

    return res;
  } catch (err) {
    console.error("Gagal login: ", err);
    return NextResponse.json(
      { error: `Terjadi kesalahan server: ${err}` },
      { status: 500 }
    );
  }
}
