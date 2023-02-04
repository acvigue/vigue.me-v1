import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";

export default async function Head() {
  return (
    <NextSeo {...DefaultSEO} title={"All Posts"} />
  );
}
