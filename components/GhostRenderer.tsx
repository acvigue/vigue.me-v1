import Renderer, { MobiledocInput } from 'react-mobiledoc-renderer';
import "styles/mobiledoc.scss";

import cards from './mobiledoc/cards';

export interface GhostRendererProps {
    mobiledoc: Object;
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

export default async function GhostRenderer(props: GhostRendererProps) {

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
}