import { getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "All Posts",
};

async function getData() {
  const posts = await getPosts({ fields: ["feature_image", "published_at", "excerpt", "slug", "title", "id", "featured"] });

  return posts;
}

export default async function Page() {
  const data = await getData();

  if (!data) notFound();

  return (
    <main className="mx-auto mb-8 mt-8 flex w-full flex-col items-center justify-center md:mt-16">
      <div className="mb-4 flex w-full max-w-6xl flex-col gap-4">
        <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
          <h4 className="inline text-3xl font-bold uppercase leading-none tracking-tight text-pink-600">All Posts</h4>
        </div>
        <div className="inline-flex w-full flex-wrap justify-end gap-4 md:gap-8">
          <Link href={`/tags/projects`}>
            <p className="transform text-sm font-bold uppercase text-pink-600 duration-200 hover:text-pink-400">View only projects</p>
          </Link>
        </div>
      </div>
      <div className="prose mt-4 w-full max-w-6xl dark:prose-dark">
        <PostsList posts={data} />
      </div>
    </main>
  );
}
