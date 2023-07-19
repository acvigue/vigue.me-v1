import { PostOrPage } from "@tryghost/content-api";

import BlogPost from "@/components/BlogPost";

export default function PostsList({ posts }: { posts: PostOrPage[] }) {
  return (
    <>
      {(!posts.length && <p className="my-8 mb-4 self-center text-gray-600 dark:text-gray-400">No posts found ;-;</p>) || (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      )}
    </>
  );
}
