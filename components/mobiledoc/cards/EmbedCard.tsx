export interface Props {
  payload: {
    html: string;
    key: number;
  }
}

export default function EmbedCard(props: Props) {
  const payload = props.payload;

  return (
    <div dangerouslySetInnerHTML={{__html: payload.html}}></div>
  );
}