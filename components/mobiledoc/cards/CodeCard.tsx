"use client";

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeCardPayload {
    language: string;
    code: string;
    key: number;
}

export default function CodeCard({payload}: {payload: CodeCardPayload}) {
    return (
        <SyntaxHighlighter language={payload.language} style={nord}>
            {payload.code}
        </SyntaxHighlighter>
    );
}