import { cache } from "react";

import GhostContentAPI, { Params, PostOrPage, PostsOrPages } from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  ghostPath: process.env.GHOST_PATH,
  version: "v5.0"
});

export const getPages = cache(_getPages);
async function _getPages(filters: Params) {
  let x: Params = {...filters, include: ["tags", "authors"]};
  try {
    return (await api.pages.browse(x)) as PostsOrPages;
  } catch(e) {
    console.error(`[ghost] getPages error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getPosts = cache(_getPosts);
async function _getPosts(filters: Params) {
  let x: Params = {...filters, include: ["tags", "authors"]};
  try {
    return (await api.posts.browse(x)) as PostsOrPages;
  } catch(e) {
    console.error(`[ghost] getPosts error: ${e}`);
    return [] as PostsOrPages;
  }
}

export const getPage = cache(_getPage);
async function _getPage(page_id?: string, page_slug?: string) {
  try {
    return (await api.pages.read({id: page_id, slug: page_slug})) as PostOrPage;
  } catch(e) {
    console.error(`[ghost] getPage error: ${e}`);
    return {} as PostOrPage;
  }
}

export const getPost = cache(_getPost);
async function _getPost(post_id?: string, post_slug?: string) {
  try {
    return (await api.posts.read({id: post_id, slug: post_slug})) as PostOrPage;
  } catch(e) {
    console.error(`[ghost] getPost error: ${e}`);
    return {} as PostOrPage;
  }
}