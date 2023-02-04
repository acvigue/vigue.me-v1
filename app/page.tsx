import { getPage, getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import RoleScramble from "@/components/RoleScramble";
import { GhostContent } from "@/lib/render";
import PostsList from "@/components/PostsList";
import config from "site.config";
import Link from "next/link";

export const revalidate = 3600;

async function getData() {
  const page = await getPage(undefined, "home");
  const posts = await getPosts({filter: ["featured:true"], fields: ['feature_image', 'published_at', 'excerpt', 'slug', 'title', 'id', 'featured']});

  if (!page) return null;

  return { page, posts };
}

export default async function Page() {
  const data = await getData();

  if (!data) notFound();

  return (
    <>
      <main className="mx-auto mb-16 flex w-full flex-col items-center justify-center">
        <div className="mt-8 md:mt-16 mb-4 flex flex-col gap-4 max-w-6xl w-full">
          <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
            <h4 className="inline text-lg md:text-3xl font-bold uppercase leading-none text-pink-600">Hello, my name is {config.shortName}</h4>
          </div>
          <div className="italic text-gray-500 dark:text-gray-400 text-5xl">
            <div className="md:hidden">
              I&apos;m a student
            </div>
            <div className="md:block hidden">
              <RoleScramble />
            </div>
          </div>
          <div className="mt-6 ">
            <GhostContent html={data.page.html ?? ""}/>
          </div>
        </div>
        <div className="prose max-w-6xl w-full dark:prose-dark mt-6">
          <div className="text-sm font-bold uppercase text-pink-600">
            Featured Posts
          </div>
          <PostsList posts={data.posts} search={false}/>
          <div className="w-full flex justify-end mt-4">
            <Link href={`/posts`}>
              <div className="text-sm font-bold uppercase text-pink-600 hover:text-pink-400 transform duration-200">
                View More
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>

  );
}
