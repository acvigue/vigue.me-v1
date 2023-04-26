import { getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Posts"
}

async function getData() {
  const posts = await getPosts({ fields: ['feature_image', 'published_at', 'excerpt', 'slug', 'title', 'id', 'featured']});

  return posts;
}

export default async function Page() {
  const data = await getData();

  if (!data) notFound();

  return (
    <main className="mx-auto mb-16 mt-8 md:mt-16 flex w-full flex-col items-center justify-center">
      <div className="mb-4 flex flex-col gap-4 max-w-6xl w-full">
        <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
          <h4 className="inline text-3xl font-bold uppercase leading-none tracking-tight text-pink-600">All Posts</h4>
        </div>
        <div className="inline-flex flex-wrap justify-end gap-4 md:gap-8 w-full">
          <Link href={`/tags/projects`}>
            <p className="text-sm font-bold uppercase text-pink-600 hover:text-pink-400 transform duration-200">
              View only projects
            </p>
          </Link>
        </div>
      </div>
      <div className="prose max-w-6xl w-full dark:prose-dark mt-4">
        <PostsList posts={data}/>
      </div>
    </main>
  );
}
