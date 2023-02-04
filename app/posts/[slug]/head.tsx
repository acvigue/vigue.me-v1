import { getPost } from "@/lib/ghost";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";

async function getData(slug: string) {
  const post = await getPost(undefined, slug);
  if (!post.id) return { not_found: true };

  return { post };
}

export default async function Head({ params: { slug } }) {
  const { post, not_found } = await getData(slug);

  return (
    <NextSeo {...DefaultSEO} title={post?.title} description={post?.excerpt} />
  );
}
