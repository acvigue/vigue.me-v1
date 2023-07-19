import { PostOrPage } from "@tryghost/content-api";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

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

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret != process.env.GHOST_WEBHOOK_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  const body: WebhookBody = await req.json();

  const paths = [];

  if (body.page !== undefined) {
    const page = body.page;
    if (Object.keys(page.current).length === 0) {
      //page was deleted
      paths.push(`/${page.previous.slug}`);

      for (const tag of page.previous.tags ?? []) {
        paths.push(`/tags/${tag.slug}`);
      }
    } else {
      paths.push(`/${page.current.slug}`);

      if (page.previous.slug ?? page.current.slug !== page.current.slug) {
        paths.push(`/${page.previous.slug}`);
      }

      let tag_slugs: [String?] = [];

      for (const tag of [...(page.previous.tags ?? []), ...(page.current.tags ?? [])]) {
        tag_slugs.push(tag.slug);
      }

      const unique_tag_slugs = [...new Set(tag_slugs)];

      for (const tag of unique_tag_slugs) {
        paths.push(`/tags/${tag}`);
      }
    }
    paths.push(`/`);
  } else if (body.post !== undefined) {
    const post = body.post;
    if (Object.keys(post.current).length === 0) {
      //post was deleted
      for (const tag of post.previous.tags ?? []) {
        paths.push(`/tags/${tag.slug}`);
      }
      paths.push(`/posts`);

      paths.push(`/posts/${post.previous.slug}`);
    } else {
      paths.push(`/posts/${post.current.slug}`);

      let tag_slugs: [String?] = [];
      for (const tag of [...(post.previous.tags ?? []), ...(post.current.tags ?? [])]) {
        tag_slugs.push(tag.slug);
      }

      const unique_tag_slugs = [...new Set(tag_slugs)];

      for (const tag of unique_tag_slugs) {
        paths.push(`/tags/${tag}`);
      }

      if (post.previous.slug ?? post.current.slug !== post.current.slug) {
        paths.push(`/posts/${post.previous.slug}`);
      }

      paths.push(`/posts`);
    }
    paths.push(`/`);
  } else {
    return new Response("Invalid webhook body!", { status: 400 });
  }

  if (paths.length > 0) {
    await Promise.all(paths.map((path) => revalidatePath(path)));
  }

  return new Response(JSON.stringify({ revalidated: paths }), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
