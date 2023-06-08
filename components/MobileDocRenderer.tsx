import MobiledocReactRenderer from '@dailybeast/mobiledoc-react-renderer';
import "styles/mobiledoc.scss";

import cards from './mobiledoc/cards';
import { getResizedImageURLS } from '@/lib/imgproxy';
//import atoms from './mobiledoc/atoms';
//import markups from './mobiledoc/markups';

export interface Props {
    mobiledoc: Object;
}

export default function MobileDocRenderer(props: Props) {
    const options = {
        cards,
        atoms: [],
        markups: []
    };

    let mobiledoc = props.mobiledoc;

    const renderer = new MobiledocReactRenderer(options);
    
    return renderer.render(mobiledoc);
}