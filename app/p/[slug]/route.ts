import { NextRequest, NextResponse } from "next/server";
import { getPost, getPage } from "@/lib/ghost";

const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
const isValidV4UUID = (uuid) => uuidV4Regex.test(uuid);

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug; // 'a', 'b', or 'c'
  if (!isValidV4UUID(slug)) {
    return new Response("Bad slug!", { status: 400 });
  }

  const url = request.nextUrl.clone();

  try {
    const page = await getPage(slug);
    if (page.uuid) {
      url.pathname = `/${page.uuid}`;
    } else {
      const post = await getPost(slug);
      if (post.uuid) {
        url.pathname = `/posts/${post.uuid}`;
      } else {
        return new Response(`No PostOrPage found with UUID ${slug}`, { status: 400 });
      }
    }
    return NextResponse.redirect(url);
  } catch (e) {
    console.error(e);
    return new Response("Oops!", { status: 500 });
  }
}

