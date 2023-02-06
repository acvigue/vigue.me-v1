import SharedHead from "@/components/SharedHead";
import config from "@/config";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";

export default async function Head() {
  return (
    <>
      <SharedHead/>
      <NextSeo {...DefaultSEO} titleTemplate={"%s"} title={config.name} description={config.description} />
    </>
  );
}
