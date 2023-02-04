import { getPosts, getPost } from "@/lib/ghost";
import { GhostContent } from "@/lib/render";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export const revalidate = 3600;

async function getData(slug: string) {
  const post = await getPost(undefined, slug);

  if (!post.id) return { not_found: true };

  return { post };
}

export default async function Page({ params: { slug } }) {
  const { post, not_found } = await getData(slug);

  if (not_found) notFound();

  return (
    <>
      <main className=" mb-16 flex w-full flex-col items-center justify-center pt-4">
        <div data-v-5f090723="" className="container relative mx-auto lg:max-w-6xl mb-8 md:mb-16">
          <div className="flex flex-col items-center text-white">
            <div className="relative mb-4 lg:mb-4">
              <div className="absolute w-full h-full transform opacity-20 dark:opacity-25 bg-gray-600 dark:mix-blend-overlay -rotate-3 rounded-full"></div>
              <div className="relative z-10 w-full"></div>
            </div>
            <h1 className="w-3/4 text-4xl font-extrabold text-center md:mb-4 lg:text-5xl md:w-2/3 lg:w-full text-pink-600">{post.title}</h1>
            <div className="flex items-center -ml-px text-xs tracking-wide uppercase my-4 dark:text-purple-200 text-purple-800">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-4 -ml-1 transform -translate-y-px opacity-75"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"></path> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M8 4.75V8.25"></path> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M16 4.75V8.25"></path> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M7.75 10.75H16.25"></path></svg>
              <span>{format(Date.parse(post.published_at), "MMMM d, yyyy")}</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-4 ml-2 opacity-75"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"></path> <circle cx="12" cy="12" r="2.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5"></circle></svg>
              <span>{post.reading_time} min read</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute w-full h-full transform bg-gray-800 opacity-10 dark:opacity-25 dark:mix-blend-overlay -rotate-3 rounded"></div>
            <div className="relative rounded w-full bg-cover bg-center" style={{
              backgroundImage: `url("${post.feature_image}")`
            }}>
              <div style={{
                paddingTop: "50%"
              }}></div>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-6xl">
          <GhostContent html={post.html ?? ""}/>
        </div>
      </main>
    </>
    
  );
}
export async function generateStaticParams() {
  const posts = await getPosts({});

  return posts
    .map(({ slug }) => {
      return { slug };
    });
}
