import { getPages, getPage, getPost } from "@/lib/ghost";
import { GhostContent } from "@/lib/render";
import { notFound, redirect } from "next/navigation";

export const revalidate = 3600;

async function getData(slug: string) {
  const page = await getPage(undefined, slug);

  //Page not found, try to load post and redirect if possible
  if (!page.id) {
    const post = await getPost(undefined, slug);
    if (!post.id) return { not_found: true };
    redirect(`/posts/${post.slug}`);
  }

  return { page };
}

export default async function Page({ params: { slug } }) {
  const { page, not_found } = await getData(slug);

  if (not_found) {
    notFound();
  } else {
    return (
      <>
        <main className="mx-auto mb-16 flex w-full max-w-4xl flex-col items-start justify-center">
          {(page.title.indexOf("[NO_TITLE]") == -1) && (
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-pink-600 md:text-5xl">{page.title.replace("[NO_INDEX]","")}</h1>
          )}
          <div className="w-full antialiased">
            <GhostContent html={page.html ?? ""}/>
          </div>
        </main>
      </>
    );
  }
}
export async function generateStaticParams() {
  const pages = await getPages({});

  return pages
    .map(({ slug }) => {
      return { slug };
    });
}
