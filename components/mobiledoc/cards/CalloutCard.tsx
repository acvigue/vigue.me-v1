export interface CalloutCardPayload {
  calloutEmoji: string;
  calloutText: string;
  backgroundColor: string;
  key: number;
}

export default function CalloutCard({ payload }: { payload: CalloutCardPayload }) {
  return (
    <div className="flex items-center rounded-md bg-pink-600 bg-opacity-30 p-4">
      <div className="mr-4 text-3xl">{payload.calloutEmoji}</div>
      <div className="" dangerouslySetInnerHTML={{ __html: payload.calloutText }}></div>
    </div>
  );
}
