import Renderer, { MobiledocInput } from "react-mobiledoc-renderer";
import "styles/mobiledoc.scss";

import cards from "./mobiledoc/cards";
import { ImageCardPayload } from "./mobiledoc/cards/ImageCard";
import { getResizedImageURLS } from "@/lib/imgproxy";
import { GalleryCardPayload } from "./mobiledoc/cards/GalleryCard";
import { BookmarkCardPayload } from "./mobiledoc/cards/BookmarkCard";
import { VideoCardPayload } from "./mobiledoc/cards/VideoCard";
import { CodeCardPayload } from "./mobiledoc/cards/CodeCard";
import { EmbedCardPayload } from "./mobiledoc/cards/EmbedCard";
import { CalloutCardPayload } from "./mobiledoc/cards/CalloutCard";

export interface GhostRendererProps {
  mobiledoc: Object | null;
  lexical: Object | null;
}

export interface LexicalState {
  root: {
    children: any[];
    version: number;
    type: string;
  };
}

const options = {
  cards,
  atoms: {
    "soft-return": () => {
      return <br></br>;
    },
  },
};

const renderer = new Renderer(options);

function cardRenderer(childNodes) {
  return childNodes.map((card, ci) => {
    card.key = ci;
    if (card.type === "paragraph") {
      const cardContents = cardRenderer(card.children);
      return <p key={ci}>{cardContents}</p>;
    } else if (card.type === "heading") {
      const cardContents = cardRenderer(card.children);
      switch (card.tag) {
        case "h1":
          return <h1 key={ci}>{cardContents}</h1>;
        case "h2":
          return <h2 key={ci}>{cardContents}</h2>;
        case "h3":
          return <h3 key={ci}>{cardContents}</h3>;
        case "h4":
          return <h4 key={ci}>{cardContents}</h4>;
        case "h5":
          return <h5 key={ci}>{cardContents}</h5>;
        case "h6":
          return <h6 key={ci}>{cardContents}</h6>;
      }
    } else if (card.type === "quote") {
      const cardContents = cardRenderer(card.children);
      return <blockquote key={ci}>{cardContents}</blockquote>;
    } else if (card.type === "link") {
      const cardContents = cardRenderer(card.children);
      return (
        <a key={ci} href={card.url}>
          {cardContents}
        </a>
      );
    } else if (card.type === "text") {
      let node = card.text;
      const format = card.format;

      if ((format & 1) != 0) {
        node = <b>{node}</b>;
      }
      if ((format & (1 << 1)) != 0) {
        node = <i>{node}</i>;
      }
      if ((format & (1 << 2)) != 0) {
        node = <s>{node}</s>;
      }
      if ((format & (1 << 3)) != 0) {
        node = <u>{node}</u>;
      }
      if ((format & (1 << 4)) != 0) {
        node = <code>{node}</code>;
      }
      if ((format & (1 << 5)) != 0) {
        node = <sub>{node}</sub>;
      }
      if ((format & (1 << 6)) != 0) {
        node = <sup>{node}</sup>;
      }
      if ((format & (1 << 7)) != 0) {
        node = <span className="bg-pink-600 text-white">{node}</span>;
      }
      return (
        <div className="contents" key={ci}>
          {node}
        </div>
      );
    } else if (card.type === "image") {
      card.srcset = getResizedImageURLS(card.src, card.width, card.height);
      return <cards.image payload={card as ImageCardPayload} key={ci}></cards.image>;
    } else if (card.type === "markdown") {
      return <cards.markdown payload={{ markdown: card.markdown, key: ci }} key={ci}></cards.markdown>;
    } else if (card.type === "gallery") {
      card.images = card.images.map((image) => {
        const srcset = getResizedImageURLS(image.src, image.width, image.height);
        return {
          srcset,
          ...image,
        };
      });
      return <cards.gallery payload={card as GalleryCardPayload} key={ci}></cards.gallery>;
    } else if (card.type === "horizontalrule") {
      return <cards.hr payload={{ key: ci }} key={ci}></cards.hr>;
    } else if (card.type === "bookmark") {
      return <cards.bookmark payload={card as BookmarkCardPayload} key={ci}></cards.bookmark>;
    } else if (card.type === "video") {
      return <cards.video payload={card as VideoCardPayload} key={ci}></cards.video>;
    } else if (card.type === "codeblock") {
      return <cards.code payload={card as CodeCardPayload} key={ci}></cards.code>;
    } else if (card.type === "html") {
      return <cards.html payload={card as EmbedCardPayload} key={ci}></cards.html>;
    } else if (card.type === "callout") {
      return <cards.callout payload={card as CalloutCardPayload} key={ci}></cards.callout>;
    } else if (card.type === "signup") {
      return <cards.signup payload={card} key={ci}></cards.signup>;
    } else {
      console.error(`Unable to render card: ${JSON.stringify(card)}`);
      return (
        <p key={ci} className="text-red-500">
          {JSON.stringify(card)}
        </p>
      );
    }
  });
}

export default async function GhostRenderer(props: GhostRendererProps) {
  if (props.mobiledoc !== null) {
    let mobiledoc = props.mobiledoc as MobiledocInput;

    //Ghost has issues.
    for (const [si, section] of mobiledoc.sections.entries()) {
      try {
        if (section.length > 2) {
          const markups = section[2];
          if ((section[2] as any[]).length === 0) {
            continue;
          }
          if (markups[0].length === 1) {
            for (const [mi, markup] of (markups as any[]).entries()) {
              mobiledoc.sections[si][2][mi] = markup[0];
            }
          }
        }
      } catch (e) {
        console.error("Unable to fix section:");
        console.error(section);
      }
    }

    const { result } = await renderer.render(mobiledoc);
    return result;
  } else {
    const lexicalState = props.lexical as LexicalState;
    const lexicalCards = lexicalState.root.children;
    const renderedCards = cardRenderer(lexicalCards);
    return renderedCards;
  }
}
