import Renderer from 'react-mobiledoc-renderer';
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

    let mobiledoc = props.mobiledoc;

    try {
        const { result } = await renderer.render(mobiledoc);
        return result
    } catch(e) {
        console.log('Mobiledoc render error: ', e, mobiledoc);
        return (<p>Rendering error</p>)
    }
}