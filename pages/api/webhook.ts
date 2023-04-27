import { PostOrPage } from "@tryghost/content-api";
import { NextApiRequest, NextApiResponse } from "next";

interface WebhookBody {
  post?: {
    current?: PostOrPage;
    previous?: PostOrPage;
  };
  page?: {
    current?: PostOrPage;
    previous?: PostOrPage;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret;
  if (secret != process.env.GHOST_WEBHOOK_SECRET) {
    res.status(401).send({ error: "invalid_secret" });
    return;
  }

  const body: WebhookBody = req.body;

  const paths = [];

  if (body.page !== undefined) {
    const page = body.page;
    if (Object.keys(page.current).length === 0) {
      //page was deleted
      paths.push(`/${page.previous.slug}`);

      if (page.previous.tags !== undefined) {
        for (const tag of page.previous.tags) {
          paths.push(`/tags/${tag.slug}`);
        }
      }
    } else {
      paths.push(`/${page.current.slug}`);

      if (page.previous.slug != page.current.slug) {
        paths.push(`/${page.previous.slug}`);
      }

      let tag_slugs: [String?] = [];
      for (const tag of [...page.previous.tags, ...page.current.tags]) {
        tag_slugs.push(tag.slug);
      }

      const unique_tag_slugs = [...new Set(tag_slugs)];

      for (const tag of unique_tag_slugs) {
        paths.push(`/tags/${tag}`);
      }
    }
  } else if (body.post !== undefined) {
    const post = body.post;
    if (Object.keys(post.current).length === 0) {
      //post was deleted
      if (post.previous.tags !== undefined) {
        for (const tag of post.previous.tags) {
          paths.push(`/tags/${tag.slug}`);
        }
      }
      paths.push(`/posts`);

      paths.push(`/posts/${post.previous.slug}`);
    } else {
      paths.push(`/posts/${post.current.slug}`);

      let tag_slugs: [String?] = [];
      for (const tag of [...post.previous.tags, ...post.current.tags]) {
        tag_slugs.push(tag.slug);
      }

      const unique_tag_slugs = [...new Set(tag_slugs)];

      for (const tag of unique_tag_slugs) {
        paths.push(`/tags/${tag}`);
      }

      if (post.previous.slug !== post.current.slug) {
        paths.push(`/posts/${post.previous.slug}`);
      }

      paths.push(`/posts`);
    }
  } else {
    res.status(400).send({ error: "invalid_body" });
    return;
  }

  if(paths.length > 0) {
    console.log(paths);
    res.status(200).send({ revalidated: paths });
    //await Promise.all(paths.map(path => res.revalidate(path)));
  }
}

