import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret;
  if (secret != process.env.GHOST_WEBHOOK_SECRET) {
    res.status(401).send({ error: "invalid_secret" });
    return;
  }

  const body = req.body;
  res.send(body);
  console.log(body);
  return;

  if (body.page) {
    const page = body.page;
    if (Object.keys(page.current).length === 0) {
      //page was deleted
      await res.revalidate(`/${page.previous.slug}`);
    } else {
      await res.revalidate(`/${page.current.slug}`);

      if (page.previous.slug) {
        await res.revalidate(`/${page.previous.slug}`);
      }
    }
  } else if (body.post) {
    const post = body.post;
    if (Object.keys(post.current).length === 0) {
      //post was deleted
      if (post.previous.tags) {
        post.previous.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }
      await res.revalidate(`/posts`);

      await res.revalidate(`/posts/${post.previous.slug}`);
    } else {
      await res.revalidate(`/posts/${post.current.slug}`);
      await res.revalidate(`/posts`);

      if (post.current.tags) {
        post.current.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }

      if (post.previous.tags) {
        post.previous.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }

      if (post.previous.slug) {
        await res.revalidate(`/posts/${post.previous.slug}`);
      }
    }
  } else {
    res.status(400).send({ error: "no_focus" });
  }
}

