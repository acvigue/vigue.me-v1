import { getPage, getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import config from "site.config";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import GhostRenderer from "@/components/GhostRenderer";
import SignupCard from "@/components/mobiledoc/cards/SignupCard";
import NowPlaying from "@/components/NowPlayingOnSpotify";

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
    <main className="mx-auto mb-8 flex w-full flex-col items-center justify-center lg:mb-8">
      <div className="md:mt-16 mt-8 flex w-full max-w-6xl flex-col gap-4 md:mb-16 mb-8">
        <div className="inline-flex flex-wrap items-end gap-4">
          <h4 className="inline text-lg font-semibold uppercase leading-none text-pink-600 md:text-2xl">Hey, I&apos;m {config.shortName}</h4>
        </div>
        <p className="font-serif text-5xl text-gray-700 dark:text-white lg:text-7xl">I make things.</p>
        <div className="Mobiledoc mt-2 mb-4 md:mb-0 text-lg font-medium leading-tight text-gray-700 antialiased dark:text-gray-400 md:text-xl">
          <GhostRenderer mobiledoc={data.page.mobiledoc} lexical={data.page.lexical} />
        </div>
        <div className="flex-start flex w-full gap-4 items-center justify-between h-14">
          <div className="group relative transform-gpu text-white drop-shadow-2xl duration-300">
            <div className="absolute -z-10 h-full w-full -rotate-6 transform-gpu rounded-lg bg-gray-400 opacity-20 duration-300 group-hover:rotate-0 group-hover:scale-90 dark:opacity-25 dark:mix-blend-overlay"></div>
            <Link
              href={`mailto:${config.email}`}
              className="flex transform-gpu flex-row items-center rounded-lg bg-pink-600 p-3 text-sm font-bold uppercase duration-300 group-hover:scale-90"
            >
              Contact Me <FiMail className="ml-2"></FiMail>
            </Link>
          </div>
          <NowPlaying />
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
      <div className="prose mt-6 w-full max-w-6xl dark:prose-dark">
        <SignupCard payload={{}}></SignupCard>
      </div>
    </main>
  );
}
