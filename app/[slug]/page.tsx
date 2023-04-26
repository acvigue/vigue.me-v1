import { getPages, getPage, getPost } from "@/lib/ghost";
import { GhostContent } from "@/lib/render";
import { ResolvingMetadata, Metadata } from "next";
import config from "@/config";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";

export const revalidate = 3600;

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const page = await getPage(undefined, slug);

  const title = page.og_title ?? page.meta_title ?? page.title.replace("[NO_INDEX]", "").replace("[NO_TITLE]", "")

  return {
    title: title,
    description: page.meta_description ?? page.excerpt,
    openGraph: {
      title: title,
      description: page.og_description ?? page.meta_description ?? page.excerpt,
      type: 'article',
      publishedTime: page.published_at,
      modifiedTime: page.updated_at,
      url: `${config.baseUrl}/${page.slug}`,
      images: [{
        url: page.og_image ?? page.feature_image ?? config.defaultOGImage,
        alt: page.og_description ?? page.feature_image_alt ?? ""
      }]
    },
  };
}

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
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-pink-600 md:text-5xl">{page.title.replace("[NO_INDEX]", "")}</h1>
          )}
          <div className="w-full antialiased">
            <Script src="/scripts/cards.min.js"></Script>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></Script>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></Script>
            <GhostContent html={page.html ?? ""} />
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
