import { getPages, getPage, getPost } from "@/lib/ghost";
import GhostRenderer from "@/components/GhostRenderer";
import { Metadata } from "next";
import config from "@/config";
import { notFound, redirect } from "next/navigation";
import DividerCard from "@/components/mobiledoc/cards/DividerCard";
import SignupCard from "@/components/mobiledoc/cards/SignupCard";

export const revalidate = 604800;

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  let slug = params.slug as string;
  if (slug.includes("preview-")) {
    slug = slug.split("preview-")[1];
  }
  const page = await getPage(slug);

  if (!page.uuid) {
    return {};
  }

  const title = page.og_title ?? page.meta_title ?? page.title;

  return {
    title: title,
    description: page.meta_description ?? page.excerpt,
    openGraph: {
      title: title,
      description: page.og_description ?? page.meta_description ?? page.excerpt,
      type: "article",
      publishedTime: page.published_at,
      modifiedTime: page.updated_at,
      url: `${config.baseUrl}/${page.slug}`,
      images: [
        {
          url: page.og_image ?? page.feature_image ?? config.defaultOGImage,
          alt: page.og_description ?? page.feature_image_alt ?? "",
        },
      ],
    },
  };
}

async function getData(slug: string) {
  const page = await getPage(slug);

  //Page not found, try to load post and redirect if possible
  if (!page.uuid) {
    const post = await getPost(slug);
    if (!post.uuid) return { not_found: true };
    redirect(`/posts/${post.slug}`);
  }

  return { page };
}

export default async function Page({ params: { slug } }) {
  const { page, not_found } = await getData(slug);

  if (not_found) {
    notFound();
  } else {
    const hasNoTitle = page.tags?.find(({ name }) => name === "#notitle") ?? false;
    return (
      <>
        <main className="mx-auto mb-8 mt-6 flex w-full max-w-5xl flex-col items-start justify-center">
          {!hasNoTitle && <h1 className="mb-4 text-3xl font-bold tracking-tight text-pink-600 md:text-5xl">{page.title}</h1>}
          <div className="Mobiledoc w-full antialiased">
            <GhostRenderer mobiledoc={page.mobiledoc} lexical={page.lexical} />
            <DividerCard payload={{ key: 1 }}></DividerCard>
            <SignupCard payload={{}}></SignupCard>
          </div>
        </main>
      </>
    );
  }
}
export async function generateStaticParams() {
  const pages = await getPages({});

  return pages.map(({ slug }) => {
    return { slug };
  });
}
