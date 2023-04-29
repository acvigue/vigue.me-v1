/* eslint-disable @next/next/no-img-element */
export interface Props {
    payload: {
        version: string,
        type: string,
        url: string,
        metadata: {
            title: string,
            description: string,
            author: string,
            publisher: string,
            thumbnail: string,
            icon: string
        }
    }
}

export default function BookmarkCard(props: Props) {
    const payload = props.payload;

    return (
        <div className="border-2 dark:border-gray-700 border-gray-200 grid grid-cols-12 rounded-md overflow-clip">
            <div className="col-span-8 flex flex-col justify-between h-full p-6">
                <div className="flex flex-col justify-between">
                    <span className="font-bold text-md">
                        {payload.metadata.title}
                    </span>
                    <span className="font-light text-xs dark:text-gray-400 text-gray-700">
                        {payload.metadata.description}
                    </span>
                </div>
                <div className="inline-flex rounded-md bg-gray-800 overflow-clip w-fit items-center">
                    <div className="mr-4">
                        <img src={payload.metadata.icon} alt='bookmark icon' className="h-6"/>
                    </div>
                    <span className="mr-4 text-sm">
                        {payload.metadata.publisher} • {payload.metadata.author}
                    </span>
                </div>
            </div>
            <div className="col-span-4 flex justify-center align-center h-32">
                <img src={payload.metadata.thumbnail} alt='bookmark image' className="flex-shrink-0 w-full object-cover" />
            </div>
        </div>
    );
}