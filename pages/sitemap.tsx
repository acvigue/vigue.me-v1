import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

import config from "@/config";
import { getPosts, getPages } from "@/lib/ghost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await getPosts({});
  const pages = await getPages({});

  const x_pages = pages
    .filter(({published_at, title}) => {
      return (published_at != undefined && title.indexOf("[NO_INDEX]") == -1) || false;
    })
    .map(({ slug, updated_at }) => {
      return {
        loc: config.baseUrl + "/" + slug,
        lastmod: new Date(updated_at).toISOString(),
        priority: 0.7,
      };
    });

  

  const x_posts = posts
    .filter(({ published_at, title }) => {
      return (published_at != undefined && title.indexOf("[NO_INDEX]") == -1) || false;
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
  ];

  ctx.res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600");

  return getServerSideSitemap(ctx, entries);
};

export default function SiteMap() {}
