export interface Props {
    payload: {
        key: number;
    }
}

export default function DividerCard(props: Props) {
    return (
        <div className="h-[1px] dark:bg-gray-700 bg-gray-300 mx-8"></div>
    );
}