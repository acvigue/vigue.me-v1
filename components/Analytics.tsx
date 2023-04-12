"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <Script src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "18013156adf54ab583463d5a52fec7f3"}'></Script>
    </>
  );
}
