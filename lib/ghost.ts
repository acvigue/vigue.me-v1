import { cache } from "react";

import GhostContentAPI, { Params, PostOrPage, PostsOrPages } from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: "v5.0"
});

export const getPages = cache(_getPages);
async function _getPages(filters: Params) {
  const epoch = Math.floor(Date.now() / 1000);
  console.time(`[ghost] getPages ${filters} ${epoch}`);
  let x: Params = {...filters };
  const pages = (await api.pages.browse(x)) as PostsOrPages;

  console.timeEnd(`[ghost] getPages ${filters} ${epoch}`);

  return pages;
}

export const getPosts = cache(_getPosts);
async function _getPosts(filters: Params) {
  const epoch = Math.floor(Date.now() / 1000);
  console.time(`[ghost] getPosts ${filters} ${epoch}`);
  let x: Params = {...filters, include: ["tags", "authors"]};
  const posts = (await api.posts.browse(x)) as PostsOrPages;

  console.timeEnd(`[ghost] getPosts ${filters} ${epoch}`);

  return posts;
}

export const getPage = cache(_getPage);
async function _getPage(page_id?: string, page_slug?: string) {
  const epoch = Math.floor(Date.now() / 1000);
  console.time(`[ghost] getPage ${page_id} ${epoch}`);
  
  const page = (await api.pages.read({id: page_id, slug: page_slug})) as PostOrPage;

  console.timeEnd(`[ghost] getPage ${page_id} ${epoch}`);

  return page;
}

export const getPost = cache(_getPost);
async function _getPost(post_id?: string, post_slug?: string) {
  const epoch = Math.floor(Date.now() / 1000);
  console.time(`[ghost] getPost ${post_id} ${epoch}`);
  
  const post = (await api.posts.read({id: post_id, slug: post_slug})) as PostOrPage;

  console.timeEnd(`[ghost] getPost ${post_id} ${epoch}`);

  return post;
}
/*
export const getBlockChildren = cache(_getBlockChildren);
async function _getBlockChildren(block_id: string): Promise<NotionBlock[]> {
  const epoch = Math.floor(Date.now() / 1000);
  console.time(`[ghost] getBlockChildren ${block_id} ${epoch}`);

  const list = await notion.blocks.children.list({ block_id });

  while (list.has_more) {
    const { results, has_more, next_cursor } = await notion.blocks.children.list({ block_id, start_cursor: list.next_cursor });
    list.results = list.results.concat(results);
    list.has_more = has_more;
    list.next_cursor = next_cursor;
  }

  const children = await Promise.all(
    list.results
      .filter(({ has_children, type }: BlockWithChildren) => !["unsupported", "child_page"].includes(type) && has_children)
      .map(async ({ id }) => {
        return { id, children: await getBlockChildren(id) };
      })
  );

  const blocks = list.results.map((block: BlockWithChildren) => {
    if (!["unsupported", "child_page"].includes(block.type) && block.has_children && !block[block.type].children) {
      block[block.type].children = children.find(({ id }) => id === block.id)?.children;
    }
    return block;
  });

  const blockChildren = await Promise.all(
    blocks.map(async (block) => {
      const contents = block[block.type];
      switch (block.type) {
        case "table_of_contents":
          block.table_of_contents["children"] = blocks
            .filter(({ type }) => ["heading_1", "heading_2", "heading_3"].includes(type))
            .map((block: BlockWithChildren) => {
              return {
                title: getPlainText(block[block.type].rich_text),
                type: block.type,
                children: [],
              };
            })
            .reduce((acc: TableOfContentsItem[], curr: TableOfContentsItem) => {
              if (curr.type === "heading_1") {
                acc.push({ ...curr, children: [] });
              } else if (curr.type === "heading_2") {
                const prev = acc[acc.length - 1];
                if (prev?.type === "heading_1") {
                  prev.children.push(curr);
                } else {
                  acc.push(curr);
                }
              } else if (curr.type === "heading_3") {
                const prev = acc[acc.length - 1];
                const prevprev = prev?.children[prev.children.length - 1];
                if (prevprev?.type === "heading_2") {
                  prevprev.children.push(curr);
                } else if (prev?.type === "heading_1") {
                  prev.children?.push(curr);
                } else {
                  acc.push(curr);
                }
              }
              return acc;
            }, []);
          break;

        case "link_to_page":
          const {
            properties: { title },
          } = await getPage(contents[contents.type]);
          block.link_to_page["title"] = getPlainText(title[title.type]);
          break;

        case "synced_block":
          if (contents.synced_from != null) {
            const source_block = await getBlockChildren(contents.synced_from.block_id);
            block[block.type]["children"] = source_block;
          }
          break;

        default:
          break;
      }

      return block;
    })
  ).then((blocks: BlockWithChildren[]) => {
    return blocks.reduce((acc: NotionBlock[], curr: NotionBlock) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: blockID.next().value || "",
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: blockID.next().value || "",
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  });

  console.timeEnd(`[ghost] getBlockChildren ${block_id} ${epoch}`);

  return blockChildren;
}
*/