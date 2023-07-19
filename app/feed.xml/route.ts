import RSS from "rss";
import config from "@/config";
import { getPosts, getPages } from "@/lib/ghost";

export async function GET(request: Request) {
  const posts = await getPosts({});
  const pages = await getPages({});

  const site_url = config.baseUrl;
  const rssOptions = {
    title: config.name,
    description: config.description,
    site_url: config.baseUrl,
    image_url: config.headshot,
    feed_url: `${config.baseUrl}/feed.rss`,
    generator: "X-VERCEL",
    author: config.email,
  };
  const feed = new RSS(rssOptions);

  posts.map((post) => {
    feed.item({
      title: post.og_title ?? post.meta_title ?? post.title,
      description: post.og_description ?? post.meta_description ?? post.excerpt,
      url: `${site_url}/posts/${post.slug}`,
      date: post.published_at,
      author: config.email,
      categories: post.tags.map((tag) => {
        return tag.name;
      }),
    });
  });

  pages.map((page) => {
    const hasNoIndexTag = page.tags.filter(({ name }) => name === "#noindex").length > 0;
    if (!hasNoIndexTag) {
      feed.item({
        title: page.og_title ?? page.meta_title ?? page.title,
        description: page.og_description ?? page.meta_description ?? page.excerpt,
        url: `${site_url}/${page.slug}`,
        date: page.published_at,
        author: config.email,
        categories: page.tags.map((tag) => {
          return tag.name;
        }),
      });
    }
  });

  const responseHeaders = {
    "Content-Type": "text/xml",
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
  };

  const response = feed.xml({ indent: true });

  return new Response(response, {
    status: 200,
    headers: responseHeaders,
  });
}
