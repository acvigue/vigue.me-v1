export interface DividerCardPayload {
    key: number;
}

export default function DividerCard({payload}: {payload: DividerCardPayload}) {
    return (
        <div className="h-[1px] dark:bg-gray-700 bg-gray-300 mx-8"></div>
    );
}