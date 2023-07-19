export interface EmbedCardPayload {
  html: string;
  key: number;
}

export default function EmbedCard({ payload }: { payload: EmbedCardPayload }) {
  return <div dangerouslySetInnerHTML={{ __html: payload.html }}></div>;
}
