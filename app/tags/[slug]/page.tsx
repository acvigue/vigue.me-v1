import { getPost, getPosts, getTag, getTags } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import { Tag } from "@tryghost/content-api";
import { ResolvingMetadata, Metadata } from "next";
import config from "@/config";

export const revalidate = 3600;

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const tag = (await getTag(undefined, slug)) as Tag;

  if (!tag.id) {
    return {};
  }

  return {
    title: tag.name,
    description: tag.og_description ?? tag.meta_description ?? tag.description,
    openGraph: {
      title: `${tag.og_title ?? tag.meta_title ?? tag.name}`,
      description: tag.og_description ?? tag.meta_description ?? tag.description,
      url: `${config.baseUrl}/tags/${tag.slug}`,
      images: [
        {
          url: tag.og_image ?? tag.feature_image ?? config.defaultOGImage,
          alt: tag.og_description ?? "",
        },
      ],
    },
  };
}

async function getData(slug: string) {
  const tag = (await getTag(undefined, slug)) as Tag;
  const posts = await getPosts({
    fields: ["feature_image", "published_at", "excerpt", "slug", "title", "id", "featured"],
    filter: [`tag:${slug}`],
  });

  return { tag, posts };
}

export default async function Page({ params: { slug } }) {
  const data = await getData(slug);

  if (!data.posts || !data.tag) notFound();

  return (
    <main className="mx-auto mb-16 mt-8 flex w-full flex-col items-center justify-center md:mt-16">
      <div className="mb-4 flex w-full max-w-6xl flex-col gap-4">
        <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
          <h4 className="inline text-3xl font-bold uppercase leading-none tracking-tight text-pink-600">{data.tag.name}</h4>
        </div>
      </div>
      <div className="prose mt-4 w-full max-w-6xl dark:prose-dark">
        <PostsList posts={data.posts} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const tags = await getTags({});

  return tags.map(({ slug }) => {
    return { slug };
  });
}
