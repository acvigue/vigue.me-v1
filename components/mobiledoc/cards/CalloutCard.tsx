export interface CalloutCardPayload {
    calloutEmoji: string;
    calloutText: string;
    backgroundColor: string;
    key: number;
}

export default function CalloutCard({ payload }: { payload: CalloutCardPayload }) {
    return (
        <div className='p-4 bg-pink-600 bg-opacity-30 flex items-center rounded-md'>
            <div className="text-3xl mr-4">
                {payload.calloutEmoji}
            </div>
            <div className="" dangerouslySetInnerHTML={{ __html: payload.calloutText }}>
            </div>
        </div>
    );
}