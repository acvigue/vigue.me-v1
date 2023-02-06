import SharedHead from "@/components/SharedHead";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";

export default async function Head() {
  return (
    <>
      <SharedHead/>
      <NextSeo {...DefaultSEO} title={"All Posts"} />
    </>
  );
}
