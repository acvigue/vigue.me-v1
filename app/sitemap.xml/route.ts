import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import config from "@/config";
import { getPosts, getPages, getTags } from "@/lib/ghost";

export async function GET(request: Request) {
  // Fetch data from external API
  const posts = await getPosts({});
  const pages = await getPages({});
  const tags = await getTags({});

  const x_pages = pages
    .filter(({ published_at, tags }) => {
      if (published_at === undefined) {
        return false;
      }
      const hasNoIndexTag = tags.filter(({ name }) => name === "#noindex").length > 0;
      return !hasNoIndexTag;
    })
    .map(({ slug, updated_at }) => {
      return {
        loc: config.baseUrl + "/" + slug,
        lastmod: new Date(updated_at).toISOString(),
        priority: 0.7,
      };
    });

  const x_tags = tags
    .filter(({ name }) => !name.includes("#"))
    .map(({ slug }) => {
      return {
        loc: config.baseUrl + "/tags/" + slug,
        lastmod: new Date(Date.now()).toISOString(),
        priority: 0.7,
      };
    });

  const x_posts = posts
    .filter(({ published_at, tags }) => {
      if (published_at === undefined) {
        return false;
      }
      const hasNoIndexTag = tags.filter(({ name }) => name === "#noindex").length > 0;
      return !hasNoIndexTag;
    })
    .map(({ slug, updated_at }) => {
      return {
        loc: config.baseUrl + "/posts/" + slug,
        lastmod: new Date(updated_at).toISOString(),
        priority: 0.7,
      };
    });

  const entries: ISitemapField[] = [
    {
      loc: config.baseUrl,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    ...x_pages,
    {
      loc: config.baseUrl + "/posts",
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    ...x_posts,
    ...x_tags,
  ];

  const responseHeaders = {
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
  };

  return getServerSideSitemap(entries, responseHeaders);
}
