import SharedHead from "@/components/SharedHead";
import config from "@/config";
import { getPost, getTag } from "@/lib/ghost";
import DefaultSEO from "@/next-seo.config";
import { Tag } from "@tryghost/content-api";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import Script from "next/script";

async function getData(slug: string) {
  const tag = await getTag(undefined, slug) as Tag;

  const openGraph: OpenGraph = {
    title: `${tag.name} - ${config.name}`,
    description: tag.og_description ?? tag.meta_description ?? tag.description,
    url: `${config.baseUrl}/tags/${tag.slug}`,
    images: [{
      url: config.baseUrl + "/og.jpg",
    }]
  }

  return { tag, openGraph };
}

export default async function Head({ params: { slug } }) {
  const { tag, openGraph } = await getData(slug);

  return (
    <>
      <SharedHead/>
      <Script src="/scripts/cards.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></Script>
      <NextSeo {...DefaultSEO} 
        title={tag?.name ?? ""}
        description={tag?.description ?? ""} 
        canonical={openGraph?.url}
        openGraph={openGraph ?? {}}
      />
    </>
  );
}
