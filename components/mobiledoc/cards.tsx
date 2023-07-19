import dynamic from "next/dynamic";

const cards = {
  image: dynamic(() => import("./cards/ImageCard")),
  gallery: dynamic(() => import("./cards/GalleryCard")),
  html: dynamic(() => import("./cards/EmbedCard")),
  code: dynamic(() => import("./cards/CodeCard")),
  bookmark: dynamic(() => import("./cards/BookmarkCard")),
  markdown: dynamic(() => import("./cards/MarkdownCard")),
  hr: dynamic(() => import("./cards/DividerCard")),
  button: dynamic(() => import("./cards/ButtonCard")),
  callout: dynamic(() => import("./cards/CalloutCard")),
  toggle: dynamic(() => import("./cards/ToggleCard")),
  video: dynamic(() => import("./cards/VideoCard")),
  signup: dynamic(() => import("./cards/SignupCard")),
};

export default cards;
