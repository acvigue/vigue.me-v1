import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reqData = await request.nextUrl.searchParams;
  const params = new URLSearchParams({
    idsite: config.matomoSiteID,
    rec: "1",
    action_name: "business card",
    e_c: "business card"
  });

  if (reqData.has("m")) {
    const reqMethod = reqData.get("m");

    if (reqMethod == "tap") {
      const cardNumber = reqData.get("csn");
      params.set("action_name", `business card / nfc / ${cardNumber}`);
      params.set("e_n", `Card ${cardNumber}`);
      params.set("e_a", "tapped");
    } else {
      params.set("action_name", `business card / qr`);
      params.set("e_a", "scanned");
      params.set("e_n", "QR");
    }
  }

  try {
    const url = `${config.matomoURL}/main.php?${params.toString()}`;
    console.log(url);
    await fetch(url);
  } catch (e) {
    console.error("Could not call Matomo");
  }

  return NextResponse.redirect(new URL("https://vigue.me"));
}
