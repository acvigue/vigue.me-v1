"use client";

import { NextSeo } from "next-seo";
import SEO from "../next-seo.config";

export default function RootSEO({ url, title, description }: { url: string; title: string; description: string }) {
  return (
      <NextSeo {...SEO} useAppDir={true} title={title} titleTemplate={"%s"} description={description} canonical={url} openGraph={{ url, title, description }} />
  );
}
