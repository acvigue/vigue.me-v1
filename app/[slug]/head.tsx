import config from "@/config";
import { getPage } from "@/lib/ghost";
import { NextSeo } from "next-seo";

async function getData(slug: string) {
  const page = await getPage(undefined, slug);

  if (!page.id) return { not_found: true };

  return { page };
}

export default async function Head({ params: { slug } }) {
  const { page, not_found } = await getData(slug);

  return (
    <NextSeo useAppDir={true} title={page.title} description={page.excerpt} />
  );
}
