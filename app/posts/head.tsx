import config from "@/config";
import { NextSeo } from "next-seo";

export default async function Head() {
  return (
    <NextSeo useAppDir={true} title="All Posts" description={config.description} />
  );
}
