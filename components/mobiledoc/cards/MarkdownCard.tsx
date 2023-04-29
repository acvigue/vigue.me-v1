import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface Props {
    payload: {
        markdown: string;
        key: number;
    }
}

export default function MarkdownCard(props: Props) {
    const payload = props.payload;

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {payload.markdown}
        </ReactMarkdown>
    );
}