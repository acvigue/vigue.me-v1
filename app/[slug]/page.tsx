import { getPages, getPage } from "@/lib/ghost";
import { GhostContent, NotionContent } from "@/lib/render";
import { getPlainText } from "@/lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 3600;

async function getData(slug: string) {
  const page = await getPage(undefined, slug);

  if (!page.id) return { not_found: true };

  return { page };
}

export default async function Page({ params: { slug } }) {
  const { page, not_found } = await getData(slug);

  if (not_found) notFound();

  return (
    <>
      <main className="mx-auto mb-16 flex w-full max-w-4xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">{page.title}</h1>
        <div className="prose w-full max-w-none dark:prose-dark gh-content">
          <GhostContent html={page.html ?? ""}/>
        </div>
      </main>
    </>
    
  );
}
export async function generateStaticParams() {
  const pages = await getPages({});

  return pages
    .map(({ slug }) => {
      return { slug };
    });
}
