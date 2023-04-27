import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret;
  if (secret != process.env.GHOST_WEBHOOK_SECRET) {
    res.status(401).send({ error: "invalid_secret" });
    return;
  }

  const body = JSON.parse(req.body);

  if (body.page) {
    const page = body.page;
    if (JSON.stringify(page.current) === "{}") {
      //page was deleted
      await res.revalidate(`/${page.previous.slug}`);
    } else {
      await res.revalidate(`/${page.current.slug}`);

      if (page.previous.slug) {
        await res.revalidate(`/${page.previous.slug}`);
      }
    }
  } else if (body.page) {
    const page = body.page;
    if (JSON.stringify(page.current) === "{}") {
      //page was deleted
      await res.revalidate(`/pages/${page.previous.slug}`);
      await res.revalidate(`/pages`);

      if (page.previous.tags) {
        page.previous.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }
    } else {
      await res.revalidate(`/pages/${page.current.slug}`);
      await res.revalidate(`/pages`);

      if (page.current.tags) {
        page.current.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }

      if (page.previous.tags) {
        page.previous.tags.forEach(async (tag) => {
          await res.revalidate(`/tags/${tag.slug}`);
        });
      }

      if (page.previous.slug) {
        await res.revalidate(`/pages/${page.previous.slug}`);
      }
    }
  } else {
    res.status(400).send({ error: "no_focus" });
  }
}

