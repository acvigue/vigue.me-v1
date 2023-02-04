import Link from "next/link";
import { format } from "date-fns";
import { PostOrPage } from "@tryghost/content-api";
import { FiHeart } from "react-icons/fi";
import ClientImage from "./ClientImage";

export default function BlogPost({ title, excerpt, slug, published_at, feature_image, tags, featured }: PostOrPage) {
  return (
    <div className="w-full rounded mb-4 hover:scale-95 hover:z-50 hover:translate-x-2 hover:skew-y-1 transition transform duration-300">
      <Link href={`/posts/${slug}`}>
        <div className="rounded shadow-2xl group relative w-full">
          <div className="rounded">
            <div className="relative rounded w-full bg-cover bg-center" style={{
              backgroundImage: `url("${feature_image}")`
              }}>
              <div style={{
                paddingTop: "56%"
              }}></div>
            </div>
            <div className="rounded absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 bg-gradient-to-t from-black to-transparent transition transform duration-300"/>
          </div>
          <div className={`px-6 py-4 w-full h-full absolute top-0 left-0 bg-gradient-to-b from-black to-transparent rounded flex flex-col justify-between`}>
            <div>
              <div className="text-lg font-medium text-white md:text-xl">{title}</div>
              <div className={`font-mono text-sm md:text-lg text-white opacity-0 group-hover:opacity-100 md:mb-0 transition transform duration-300 line-clamp-3`}>
                {excerpt}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
