import Link from "next/link";
import { format } from "date-fns";
import { PostOrPage } from "@tryghost/content-api";
import SmartImage from "./SmartImage";
import { getResizedImageURLS } from "@/lib/imgproxy";

export default function BlogPost({ title, excerpt, slug, published_at, feature_image, tags, featured }: PostOrPage) {
  const feature_image_sources = getResizedImageURLS(feature_image, 2000, 1500);
  return (
    <div className="w-full rounded drop-shadow-2xl hover:scale-95 transition transform-gpu duration-300">
      <Link href={`/posts/${slug}`}>
        <div className="rounded group relative w-full">
          <div className="absolute w-full h-full bg-gray-500 opacity-20 dark:opacity-25 dark:mix-blend-overlay -rotate-3 rounded group-hover:rotate-0 transition transform-gpu duration-300"></div>
          <div className="rounded">
            <div className="relative rounded w-full bg-cover bg-center">
              <SmartImage sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw" fallback={feature_image} sources={feature_image_sources} alt='' className='object-cover w-full h-56 rounded' />
            </div>
            <div className="rounded absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 bg-gradient-to-t from-black to-transparent transition transform-gpu duration-300" />
          </div>
          <div className="px-6 py-4 w-full h-full absolute top-0 left-0 bg-gradient-to-b from-black to-transparent rounded flex flex-col justify-between">
            <div>
              <div className="text-lg font-medium text-white md:text-xl">{title}</div>
              <div className="font-mono text-sm md:text-md text-white opacity-0 group-hover:opacity-100 md:mb-0 transition transform-gpu duration-300 line-clamp-4">
                {excerpt}
              </div>
            </div>
            <div className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition transform-gpu duration-300">
              {format(Date.parse(published_at), "MMMM d, yyyy")}
              {(featured) && (
                <>&nbsp;•&nbsp;Featured</>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
