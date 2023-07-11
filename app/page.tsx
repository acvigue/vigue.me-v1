import { getPage, getPosts } from "@/lib/ghost";
import { notFound } from "next/navigation";
import PostsList from "@/components/PostsList";
import config from "site.config";
import Link from "next/link";
import { FiMail } from "react-icons/fi";

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
    <main className="mx-auto mb-8 lg:mb-16 flex w-full flex-col items-center justify-center">
      <div className="mt-8 lg:mt-32 md:mb-16 flex flex-col gap-4 max-w-6xl w-full">
        <div className="inline-flex flex-wrap items-end gap-4 md:gap-8">
          <h4 className="inline text-lg md:text-2xl font-bold uppercase leading-none text-pink-600">Hey, I&apos;m {config.shortName}</h4>
        </div>
        <p className="lg:text-7xl text-5xl font-serif text-gray-700 dark:text-white">
        I make things.
        </p>
        <div className="text-lg mt-2 dark:text-gray-400 text-gray-700 md:text-xl font-medium leading-tight antialiased" dangerouslySetInnerHTML={{__html: data.page.html}}/>
        <div className="flex flex-start flex-shrink">
          <div className="text-white drop-shadow-2xl relative transform-gpu duration-300 group">
            <div className="absolute w-full h-full transform-gpu dark:mix-blend-overlay bg-gray-400 opacity-20 dark:opacity-25 -rotate-6 rounded-lg -z-10 duration-300 group-hover:rotate-0 group-hover:scale-90"></div>
            <Link href={`mailto:${config.email}`} className="text-sm font-bold uppercase flex flex-row items-center p-3 bg-pink-600 rounded-lg transform-gpu duration-300 group-hover:scale-90">
              Get in touch <FiMail className="ml-2"></FiMail>
            </Link>
          </div>
        </div>
      </div>
      <div className="prose max-w-6xl w-full dark:prose-dark mt-6">
        <p className="text-sm font-bold uppercase text-pink-600">
          Featured Content
        </p>
        <PostsList posts={data.posts}/>
        <div className="w-full flex justify-end mt-4">
          <Link href={`/posts`}>
            <p className="text-sm font-bold uppercase text-pink-600 hover:text-pink-400 transform duration-200">
              View All
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
