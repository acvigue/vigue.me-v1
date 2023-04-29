import MobiledocReactRenderer from '@dailybeast/mobiledoc-react-renderer';
import "styles/mobiledoc.scss";

import cards from './mobiledoc/cards';
//import atoms from './mobiledoc/atoms';
//import markups from './mobiledoc/markups';

export interface Props {
    mobiledoc: Object;
}

export default async function MobileDocRenderer(props: Props) {
    const options = {
        cards,
        atoms: [],
        markups: []
    };

    console.log(props.mobiledoc);

    const renderer = new MobiledocReactRenderer(options);

    const comp = await renderer.render(props.mobiledoc);
    return (
        <div>
            {comp}
        </div>
    );
}