import { getPosts, getPost } from "@/lib/ghost";
import GhostRenderer from "@/components/GhostRenderer";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Metadata } from "next";
import { config } from "@/config";
import { getResizedImageURLS } from "@/lib/imgproxy";
import SmartImage from "@/components/SmartImage";
import SignupCard from "@/components/mobiledoc/cards/SignupCard";
import DividerCard from "@/components/mobiledoc/cards/DividerCard";

export const revalidate = 604800;
const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
const isValidV4UUID = (uuid) => uuidV4Regex.test(uuid);

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const post = await getPost(slug);

  if (!post.uuid) {
    return {};
  }

  return {
    title: post.og_title ?? post.meta_title ?? post.title,
    description: post.og_description ?? post.meta_description ?? post.excerpt,
    openGraph: {
      title: `${post.og_title ?? post.meta_title ?? post.title}`,
      description: post.og_description ?? post.meta_description ?? post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: `${config.baseUrl}/posts/${post.slug}`,
      images: [
        {
          url: post.og_image ?? post.feature_image ?? config.defaultOGImage,
          alt: post.og_description ?? post.feature_image_alt ?? "",
        },
      ],
    },
  };
}

async function getData(slug: string) {
  const post = await getPost(slug);

  if (!post.uuid) return { not_found: true };

  const posts = await getPosts({ include: [] });
  const slugs = posts.map((p) => p.slug);

  const index = slugs.indexOf(post?.slug);
  const prevSlug = index > 0 ? slugs[index - 1] : null;
  const nextSlug = index < slugs.length - 1 ? slugs[index + 1] : null;

  let prevPost = (prevSlug && (await getPost(prevSlug))) || null;
  let nextPost = (nextSlug && (await getPost(nextSlug))) || null;

  return { post, pagination: { prevPost, nextPost } };
}

export default async function Page({ params }) {
  let slug = params.slug as string;
  if (slug.includes("preview-")) {
    slug = slug.split("preview-")[1];
  }

  const { post, pagination, not_found } = await getData(slug);

  if (not_found) notFound();

  const feature_image_srcset = getResizedImageURLS(post.feature_image, 2000, 1500);

  return (
    <main className="mb-8 flex w-full flex-col items-center justify-center pt-4">
      <div className="container relative mx-auto mb-8 md:mb-8 lg:max-w-6xl">
        <div className="flex flex-col items-center text-white">
          <h1 className="mb-4 w-3/4 text-center text-4xl font-extrabold text-pink-600 md:w-2/3 lg:w-full lg:text-5xl">{post.title}</h1>
          <h4 className="text-md inline text-center font-semibold leading-none text-pink-600">
            <i>{post.excerpt}</i>
          </h4>
          <div className="my-4 -ml-px flex items-center text-xs uppercase tracking-wide text-pink-600">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="-ml-1 h-4 -translate-y-px transform opacity-75">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"
              ></path>{" "}
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4.75V8.25"></path>{" "}
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 4.75V8.25"></path>{" "}
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 10.75H16.25"></path>
            </svg>
            <span>{post.published_at !== null ? format(Date.parse(post.published_at), "MMMM d, yyyy") : "UNPUBLISHED"}</span>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="ml-2 h-4 opacity-75">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"
              ></path>{" "}
              <circle
                cx="12"
                cy="12"
                r="2.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
            </svg>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
        {post.feature_image !== null && (
          <div className="relative">
            <div className="absolute h-full w-full -rotate-2 transform rounded bg-gray-500 opacity-20 dark:opacity-25"></div>
            <div className="relative">
              <SmartImage
                srcset={feature_image_srcset}
                sizes="90vw"
                alt={post.feature_image_alt ?? "Post Feature Image"}
                className="max-h-[300px] w-full rounded object-cover md:max-h-[500px]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="Mobiledoc mb-8 flex w-full max-w-5xl flex-col gap-5 px-4 antialiased md:px-0">
        <GhostRenderer mobiledoc={post.mobiledoc} lexical={post.lexical} />
        <DividerCard payload={{ key: 1 }}></DividerCard>
        <SignupCard payload={{}}></SignupCard>
      </div>

      <div className="flex w-full max-w-6xl flex-col items-center justify-center md:flex-row md:justify-between">
        {pagination.prevPost != null && (
          <Link href={`/posts/${pagination.prevPost.slug}`}>
            <div className="flex transform items-center text-lg font-semibold text-pink-600 duration-300 hover:text-pink-400">
              <FiArrowLeft className="inline" />
              <span>{pagination.prevPost.title}</span>
            </div>
          </Link>
        )}
        {pagination.prevPost == null && (
          <div className="hidden text-lg font-semibold text-gray-500 md:block">
            <span>No newer posts</span>
          </div>
        )}

        {pagination.nextPost != null && (
          <Link href={`/posts/${pagination.nextPost.slug}`}>
            <div className="flex transform items-center text-lg font-semibold text-pink-600 duration-300 hover:text-pink-400">
              <span>{pagination.nextPost.title}</span>
              <FiArrowRight className="inline" />
            </div>
          </Link>
        )}

        {pagination.nextPost == null && (
          <div className="hidden text-lg font-semibold text-gray-500 md:block">
            <span>No older posts</span>
          </div>
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts({});

  return posts.map(({ slug }) => {
    return { slug };
  });
}
