"use client";

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface Props {
    payload: {
        language: string;
        code: string;
        key: number;
    }
}

export default function CodeCard(props: Props) {
    const payload = props.payload;

    return (
        <SyntaxHighlighter language={payload.language} style={nord}>
            {payload.code}
        </SyntaxHighlighter>
    );
}