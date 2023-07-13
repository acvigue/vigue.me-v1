import Renderer, { MobiledocInput } from 'react-mobiledoc-renderer';
import "styles/mobiledoc.scss";

import cards from './mobiledoc/cards';
import { ImageCardPayload } from './mobiledoc/cards/ImageCard';
import { getResizedImageURLS } from '@/lib/imgproxy';
import { GalleryCardPayload } from './mobiledoc/cards/GalleryCard';
import { BookmarkCardPayload } from './mobiledoc/cards/BookmarkCard';
import { VideoCardPayload } from './mobiledoc/cards/VideoCard';

export interface GhostRendererProps {
    mobiledoc: Object | null;
    lexical: Object | null;
}

export interface LexicalState {
    root: {
        children: any[]
        version: number
        type: string
    }
}

const options = {
    cards,
    atoms: {
        "soft-return": () => {
            return (<br></br>)
        }
    }
};

const renderer = new Renderer(options);

function cardRenderer(childNodes) {
    return childNodes.map((card, ci) => {
        if (card.type === "paragraph") {
            const cardContents = cardRenderer(card.children);
            return (<p key={ci}>{cardContents}</p>)
        } else if (card.type === "heading") {
            const cardContents = cardRenderer(card.children);
            switch (card.tag) {
                case "h1": return (<h1 key={ci}>{cardContents}</h1>);
                case "h2": return (<h2 key={ci}>{cardContents}</h2>);
                case "h3": return (<h3 key={ci}>{cardContents}</h3>);
                case "h4": return (<h4 key={ci}>{cardContents}</h4>);
                case "h5": return (<h5 key={ci}>{cardContents}</h5>);
                case "h6": return (<h6 key={ci}>{cardContents}</h6>);
            }
        } else if (card.type === "quote") {
            const cardContents = cardRenderer(card.children);
            return (<blockquote key={ci}>{cardContents}</blockquote>)
        } else if (card.type === "link") {
            const cardContents = cardRenderer(card.children);
            return (<a key={ci} href={card.url}>{cardContents}</a>)
        } else if (card.type === "text") {
            if (card.format === 0) {
                return card.text
            } else if (card.format === 1) {
                return (<b key={ci}>{card.text}</b>)
            } else if (card.format === 2) {
                return (<i key={ci}>{card.text}</i>)
            } else if (card.format === 3) {
                return (<b key={ci}><i>{card.text}</i></b>)
            } else if (card.format === 16) {
                return (<code key={ci}>{card.text}</code>)
            }
        } else if (card.type === "image") {
            const srcset = getResizedImageURLS(card.src, card.width, card.height);
            const payload: ImageCardPayload = {
                src: card.src,
                alt: card.alt,
                title: card.title,
                width: card.width,
                height: card.height,
                srcset: srcset,
                key: ci
            }
            return <cards.image payload={payload} key={ci}></cards.image>
        } else if (card.type === "markdown") {
            return <cards.markdown payload={{ markdown: card.markdown, key: ci }} key={ci}></cards.markdown>
        } else if (card.type === "gallery") {
            let images = card.images.map((image) => {
                const srcset = getResizedImageURLS(image.src, image.width, image.height);
                return {
                    srcset,
                    ...image
                }
            })
            const payload: GalleryCardPayload = {
                images,
                key: ci
            }
            return <cards.gallery payload={payload} key={ci}></cards.gallery>
        } else if (card.type === "horizontalrule") {
            return <cards.hr payload={{ key: ci }} key={ci}></cards.hr>
        } else if (card.type === "bookmark") {
            const payload: BookmarkCardPayload = {
                version: card.version,
                type: card.type,
                url: card.url,
                metadata: card.metadata
            }
            return <cards.bookmark payload={payload} key={ci}></cards.bookmark>
        } else if (card.type === "video") {
            const payload: VideoCardPayload = {
                loop: card.loop,
                src: card.src,
                thumbnailSrc: card.thumbnailSrc,
                mimeType: card.mimeType,
                key: ci
            }
            return <cards.video payload={payload} key={ci}></cards.video>
        } else {
            console.error(`Unable to render card: ${JSON.stringify(card)}`)
            return (<p key={ci}></p>)
        }
    })
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
                console.log(section);
            }
        }

        try {
            const { result } = await renderer.render(mobiledoc);
            return result
        } catch (e) {
            console.log('Mobiledoc render error: ', e, mobiledoc);
            return (<p>Rendering error</p>)
        }
    } else {
        const lexicalState = props.lexical as LexicalState;
        const lexicalCards = lexicalState.root.children;
        const renderedCards = cardRenderer(lexicalCards);
        return renderedCards
    }
}