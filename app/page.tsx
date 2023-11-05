import { getPage, getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import config from "site.config";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import GhostRenderer from "@/components/GhostRenderer";

export const revalidate = 604800;

async function getData() {
  const page = await getPage("home");
  const posts = await getPosts({
    filter: ["featured:true"],
    fields: ["feature_image", "published_at", "excerpt", "slug", "title", "id", "featured"],
  });

  if (!page) return null;

  return { page, posts };
}

export default async function Page() {
  const data = await getData();

  if (!data) notFound();

  return (
    <main className="mx-auto mb-8 flex w-full flex-col items-center justify-center lg:mb-16">
      <div className="mt-8 flex w-full max-w-6xl flex-col gap-4 md:mb-16 lg:mt-32">
        <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
          <h4 className="inline text-lg font-bold uppercase leading-none text-pink-600 md:text-2xl">Hey, I&apos;m {config.shortName}</h4>
        </div>
        <p className="font-serif text-5xl text-gray-700 dark:text-white lg:text-7xl">I make things.</p>
        <div className="Mobiledoc mt-2 text-lg font-medium leading-tight text-gray-700 antialiased dark:text-gray-400 md:text-xl">
          <GhostRenderer mobiledoc={data.page.mobiledoc} lexical={data.page.lexical} />
        </div>
        <div className="flex-start flex flex-shrink">
          <div className="group relative transform-gpu text-white drop-shadow-2xl duration-300">
            <div className="absolute -z-10 h-full w-full -rotate-6 transform-gpu rounded-lg bg-gray-400 opacity-20 duration-300 group-hover:rotate-0 group-hover:scale-90 dark:opacity-25 dark:mix-blend-overlay"></div>
            <Link
              href={`mailto:${config.email}`}
              className="flex transform-gpu flex-row items-center rounded-lg bg-pink-600 p-3 text-sm font-bold uppercase duration-300 group-hover:scale-90"
            >
              Get in touch <FiMail className="ml-2"></FiMail>
            </Link>
          </div>
        </div>
      </div>
      <div className="prose mt-6 w-full max-w-6xl dark:prose-dark">
        <p className="text-sm font-bold uppercase text-pink-600">Featured Content</p>
        <PostsList posts={data.posts} />
        <div className="mt-4 flex w-full justify-end">
          <Link href={`/posts`}>
            <p className="transform text-sm font-bold uppercase text-pink-600 duration-200 hover:text-pink-400">View All</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
