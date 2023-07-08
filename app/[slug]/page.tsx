import { getPages, getPage, getPost } from "@/lib/ghost";
import GhostRenderer from "@/components/GhostRenderer";
import { ResolvingMetadata, Metadata } from "next";
import config from "@/config";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";

export const revalidate = 3600;

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const page = await getPage(undefined, slug);

  if(!page.id) {
    return {};
  }

  const title = page.og_title ?? page.meta_title ?? page.title

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
    const hasNoTitle = page.tags?.find(({name}) => name === '#notitle') ?? false;
    return (
      <>
        <main className="mx-auto mb-16 flex w-full max-w-5xl flex-col items-start justify-center">
          {(!hasNoTitle) && (
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-pink-600 md:text-5xl">{page.title}</h1>
          )}
          <div className="w-full antialiased Mobiledoc">
            <GhostRenderer mobiledoc={page.mobiledoc} />
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
