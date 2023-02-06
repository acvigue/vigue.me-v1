import SharedHead from "@/components/SharedHead";
import config from "@/config";
import { getPost } from "@/lib/ghost";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import Script from "next/script";

async function getData(slug: string) {
  const post = await getPost(undefined, slug);
  if (!post.id) return { not_found: true };

  const openGraph: OpenGraph = {
    title: `${post.og_title ?? post.meta_title ?? post.title} - ${config.name}`,
    description: post.og_description ?? post.meta_description ?? post.excerpt,
    article: {
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
    },
    url: `${config.baseUrl}/posts/${post.slug}`,
    images: [{
      url: post.og_image ?? post.feature_image,
      alt: post.og_description ?? post.feature_image_alt
    }]
  }

  return { post, openGraph };
}

export default async function Head({ params: { slug } }) {
  const { post, openGraph } = await getData(slug);

  return (
    <>
      <SharedHead/>
      <Script src="/scripts/cards.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></Script>
      <NextSeo {...DefaultSEO} 
        title={post?.meta_title ?? post?.title}
        description={post?.meta_description ?? post?.excerpt} 
        canonical={openGraph?.url}
        openGraph={openGraph ?? {}}
      />
    </>
  );
}
