import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reqData = await request.nextUrl.searchParams;

  if (reqData.has("m")) {
    const reqMethod = reqData.get("m");

    if(reqMethod == "tap") {
      const cardNumber = reqData.get("csn");
    }
  }

  return NextResponse.redirect(new URL('https://vigue.me'));
}
