import { cache } from "react";

import GhostContentAPI, { Params, PostOrPage, PostsOrPages, Tag, Tags } from "@tryghost/content-api";
import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import GhostAdminAPI from "@tryghost/admin-api";
import { getResizedImageURLS } from "./imgproxy";

const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
const isValidV4UUID = (uuid) => uuidV4Regex.test(uuid);

// Create API instance with site credentials
const contentAPI = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  ghostPath: process.env.GHOST_PATH,
  version: "v5.0",
});

const untypedAdminAPI = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  ghostPath: process.env.GHOST_PATH,
  version: "v5.0",
});

const adminAPI = new TSGhostAdminAPI(`${process.env.GHOST_URL}/${process.env.GHOST_PATH}`, process.env.GHOST_ADMIN_KEY, "v5.0");

interface PostOrPageWithContent extends PostOrPage {
  mobiledoc: Object | null;
  lexical: Object | null;
}

export const getPages = cache(_getPages);
async function _getPages(filters: Params) {
  let x: Params = { ...filters, include: ["tags", "authors"], limit: 'all' };
  try {
    return (await contentAPI.pages.browse(x)) as PostsOrPages;
  } catch (e) {
    console.error(`[ghost] getPages error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getPosts = cache(_getPosts);
async function _getPosts(filters: Params) {
  let x: Params = { ...filters, include: ["tags", "authors"], limit: 'all' };
  try {
    return (await contentAPI.posts.browse(x)) as PostsOrPages;
  } catch (e) {
    console.error(`[ghost] getPosts error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getTags = cache(_getTags);
async function _getTags(filters: Params) {
  let x: Params = { ...filters, limit: 'all' };
  try {
    return (await contentAPI.tags.browse(x)) as Tags;
  } catch (e) {
    console.error(`[ghost] getTags error: ${e}`);
    return [] as Tags;
  }
}

export const getTag = cache(_getTag);
async function _getTag(tag_id?: string, tag_slug?: string) {
  try {
    return (await contentAPI.tags.read({ id: tag_id, slug: tag_slug })) as Tag;
  } catch (e) {
    console.error(`[ghost] getTag error: ${e}`);
    return [] as Tags;
  }
}

function fixMobiledoc(md: Object): Object {
  let mobiledoc = md;
  for (const [i, card] of mobiledoc["cards"].entries()) {
    const [name, payload] = card;
    if (name == "image") {
      const srcset = getResizedImageURLS(payload.src, payload.width, payload.height);
      mobiledoc["cards"][i][1] = {
        srcset,
        ...payload,
      };
    }
    if (name == "gallery") {
      for (const [x, image] of payload["images"].entries()) {
        const srcset = getResizedImageURLS(image.src, image.width, image.height);
        mobiledoc["cards"][i][1]["images"][x] = {
          srcset,
          ...image,
        };
      }
    }
  }
  return mobiledoc;
}

export const getPage = cache(_getPage);
async function _getPage(page_slug: string) {
  try {
    if (isValidV4UUID(page_slug)) {
      const allDraftPages = await adminAPI.pages.browse({ limit: "all", filter: "status:draft", fields: "uuid,id" }).fetch();
      if (allDraftPages.success) {
        const draftPage = allDraftPages.data.find((page) => page.uuid === page_slug);
        if (draftPage) {
          page_slug = draftPage.slug;
        } else {
          throw new Error("UUID not a draft page!");
        }
      } else {
        throw new Error("Couldn't fetch draft pages!");
      }
    }

    const page = await untypedAdminAPI.pages.read({ slug: page_slug }, { include: "authors,tags", formats: "mobiledoc,lexical" });

    if (!page.uuid) {
      return {} as PostOrPageWithContent;
    }
    let x = page as unknown as PostOrPageWithContent;
    if (page.mobiledoc !== null) {
      x.mobiledoc = fixMobiledoc(JSON.parse(page.mobiledoc));
    }
    if (page.lexical !== null) {
      x.lexical = JSON.parse(page.lexical);
    }
    return x;
  } catch (e) {
    console.error(`[ghost] getPage error: ${e}`);
    return {} as PostOrPageWithContent;
  }
}

export const getPost = cache(_getPost);
async function _getPost(post_slug: string) {
  try {
    if (isValidV4UUID(post_slug)) {
      const allDraftPosts = await adminAPI.posts.browse({ limit: "all", filter: "status:draft", fields: "uuid,id" }).fetch();
      if (allDraftPosts.success) {
        const draftPost = allDraftPosts.data.find((post) => post.uuid === post_slug);
        if (draftPost) {
          post_slug = draftPost.slug;
        } else {
          throw new Error("UUID not a draft post!");
        }
      } else {
        throw new Error("Couldn't fetch draft posts!");
      }
    }

    const post = await untypedAdminAPI.posts.read({ slug: post_slug }, { include: "authors,tags", formats: "mobiledoc,lexical" });

    if (!post.uuid) {
      return {} as PostOrPageWithContent;
    }
    let x = post as unknown as PostOrPageWithContent;
    if (post.mobiledoc !== null) {
      x.mobiledoc = fixMobiledoc(JSON.parse(post.mobiledoc));
    }
    if (post.lexical !== null) {
      x.lexical = JSON.parse(post.lexical);
    }
    return x;
  } catch (e) {
    console.error(`[ghost] getPost error: ${e}`);
    return {} as PostOrPageWithContent;
  }
}

