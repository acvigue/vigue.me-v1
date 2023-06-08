import { cache } from "react";

import GhostContentAPI, { Params, PostOrPage, PostsOrPages, Tag, Tags } from "@tryghost/content-api";
import GhostAdminAPI from "@tryghost/admin-api";
import { getResizedImageURLS } from "./imgproxy";

// Create API instance with site credentials
const contentAPI = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  ghostPath: process.env.GHOST_PATH,
  version: "v5.0",
});

const adminAPI = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  ghostPath: process.env.GHOST_PATH,
  version: "v5.0",
});

interface PostOrPageWithMobiledoc extends PostOrPage {
  mobiledoc: Object;
}

export const getPages = cache(_getPages);
async function _getPages(filters: Params) {
  let x: Params = { ...filters, include: ["tags", "authors"] };
  try {
    return (await contentAPI.pages.browse(x)) as PostsOrPages;
  } catch (e) {
    console.error(`[ghost] getPages error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getPosts = cache(_getPosts);
async function _getPosts(filters: Params) {
  let x: Params = { ...filters, include: ["tags", "authors"] };
  try {
    return (await contentAPI.posts.browse(x)) as PostsOrPages;
  } catch (e) {
    console.error(`[ghost] getPosts error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getTags = cache(_getTags);
async function _getTags(filters: Params) {
  let x: Params = { ...filters };
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

export const getPage = cache(_getPage);
async function _getPage(page_id?: string, page_slug?: string) {
  try {
    let main = (await contentAPI.pages.read({ id: page_id, slug: page_slug })) as PostOrPageWithMobiledoc;
    const adminPage = await adminAPI.pages.read({ id: page_id, slug: page_slug });
    let mobiledoc = JSON.parse(adminPage.mobiledoc);

    for (const [i, card] of mobiledoc["cards"].entries()) {
      const [name, payload] = card;
      if (name == "image") {
        const srcset = getResizedImageURLS(payload.src, payload.width, payload.height);
        mobiledoc["cards"][i][1] = {
          srcset,
          ...payload,
        };
      }
    }

    main.mobiledoc = mobiledoc;

    return main;
  } catch (e) {
    console.error(`[ghost] getPage error: ${e}`);
    return {} as PostOrPageWithMobiledoc;
  }
}

export const getPost = cache(_getPost);
async function _getPost(post_id?: string, post_slug?: string) {
  try {
    let main = (await contentAPI.posts.read({ id: post_id, slug: post_slug }, { include: ["authors", "tags"] })) as PostOrPageWithMobiledoc;
    const adminPost = await adminAPI.posts.read({ id: post_id, slug: post_slug });
    let mobiledoc = JSON.parse(adminPost.mobiledoc);

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

    main.mobiledoc = mobiledoc;
    return main;
  } catch (e) {
    console.error(`[ghost] getPost error: ${e}`);
    return {} as PostOrPageWithMobiledoc;
  }
}

