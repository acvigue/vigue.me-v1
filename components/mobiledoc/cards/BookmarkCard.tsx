/* eslint-disable @next/next/no-img-element */
'use client';
export interface BookmarkCardPayload {
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

export default function BookmarkCard({ payload }: { payload: BookmarkCardPayload }) {
    return (
        <div onClick={(e) => {
            e.preventDefault();
            window.location.href = payload.url;
        }} className="border-2 dark:border-gray-700 border-gray-200 rounded-md overflow-clip cursor-pointer hover:scale-[0.98] transition transform-gpu duration-300 relative h-40">
            <div className="flex flex-col justify-between p-6 absolute w-full h-40 z-20">
                <div className="flex flex-col justify-between">
                    <span className="font-bold text-md sm:text-lg line-clamp-1">
                        {payload.metadata.title}
                    </span>
                    <span className="font-light text-xs sm:text-sm dark:text-gray-400 text-gray-700 line-clamp-2">
                        {payload.metadata.description}
                    </span>
                </div>
                <div className="inline-flex rounded-md bg-gray-700 overflow-clip w-fit items-center mt-2">
                    <div className="mr-4">
                        <img src={payload.metadata.icon} alt='bookmark icon' className="h-6" />
                    </div>
                    <span className="mr-4 text-xs line-clamp-1">
                        {payload.metadata.publisher} {(payload.metadata.author !== null) && (
                            <>• {payload.metadata.author}</>
                        )}
                    </span>
                </div>
            </div>
            <div className="absolute flex justify-end h-40 w-full z-10 opacity-25">
                <img src={payload.metadata.thumbnail} alt='bookmark image' className="flex-shrink-0 h-40" />
            </div>
        </div>
    );
}