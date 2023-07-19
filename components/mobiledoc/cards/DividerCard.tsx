export interface DividerCardPayload {
  key: number;
}

export default function DividerCard({ payload }: { payload: DividerCardPayload }) {
  return <div className="mx-8 h-[1px] bg-gray-300 dark:bg-gray-700"></div>;
}
