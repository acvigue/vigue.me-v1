export interface Props {
    payload: {
        calloutEmoji: string;
        calloutText: string;
        backgroundColor: string;
        key: number;
    }
}

export default function CalloutCard(props: Props) {
    const payload = props.payload;

    return (
        <div className='p-4 bg-pink-600 bg-opacity-30 flex items-center rounded-md'>
            <div className="text-3xl mr-4">
                {payload.calloutEmoji}
            </div>
            <div className="">
                {payload.calloutText}
            </div>
        </div>
    );
}