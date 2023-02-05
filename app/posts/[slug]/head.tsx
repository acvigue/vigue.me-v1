import config from "@/config";
import { getPost } from "@/lib/ghost";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";

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
  const { post, not_found, openGraph } = await getData(slug);

  return (
    <NextSeo {...DefaultSEO} 
      title={post?.meta_title ?? post?.title}
      description={post?.meta_description ?? post?.excerpt} 
      canonical={openGraph?.url}
      openGraph={openGraph ?? {}}
    />
  );
}
