import Link from "next/link";
import { format } from "date-fns";
import { PostOrPage } from "@tryghost/content-api";
import SmartImage from "./SmartImage";
import { getResizedImageURLS } from "@/lib/imgproxy";

export default function BlogPost({ title, excerpt, slug, published_at, feature_image, tags, featured }: PostOrPage) {
  const feature_image_srcset = getResizedImageURLS(feature_image, 2000, 1500);
  return (
    <div className="w-full transform-gpu rounded drop-shadow-2xl transition duration-300 hover:scale-95">
      <Link href={`/posts/${slug}`}>
        <div className="group relative w-full rounded">
          <div className="absolute h-full w-full -rotate-3 transform-gpu rounded bg-gray-500 opacity-20 transition duration-300 group-hover:rotate-0 dark:opacity-25 dark:mix-blend-overlay"></div>
          <div className="rounded">
            <div className="relative w-full rounded bg-cover bg-center">
              <SmartImage
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
                srcset={feature_image_srcset}
                alt="Feature Image"
                className="h-56 w-full rounded object-cover"
              />
            </div>
            <div className="absolute left-0 top-0 h-full w-full transform-gpu rounded bg-gradient-to-t from-black to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          </div>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded bg-gradient-to-b from-black to-transparent px-6 py-4">
            <div>
              <div className="text-lg font-medium text-white md:text-xl">{title}</div>
              <div className="md:text-md line-clamp-4 transform-gpu font-mono text-sm text-white opacity-0 transition duration-300 group-hover:opacity-100 md:mb-0">
                {excerpt}
              </div>
            </div>
            <div className="absolute bottom-0 my-4 transform-gpu font-mono text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100">
              {format(Date.parse(published_at), "MMMM d, yyyy")}
              {featured && <>&nbsp;•&nbsp;Featured</>}
            </div>
            <div className="absolute bottom-0 my-4 flex transform-gpu flex-row items-center justify-start gap-1 font-mono text-xs text-white opacity-100 transition duration-300 group-hover:opacity-0">
              {tags
                .filter((tag) => tag.slug !== "projects")
                .map((tag) => (
                  <div
                    className="flex flex-row items-center rounded-lg bg-pink-600 p-1 text-xs font-medium uppercase shadow-2xl"
                    key={tag.id}
                  >
                    {tag.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
