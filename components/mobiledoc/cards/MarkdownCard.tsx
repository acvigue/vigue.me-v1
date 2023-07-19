import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownCardPayload {
  markdown: string;
  key: number;
}

export default function MarkdownCard({ payload }: { payload: MarkdownCardPayload }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{payload.markdown}</ReactMarkdown>;
}
