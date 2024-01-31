/* eslint-disable @next/next/no-img-element */
"use client";
export interface BookmarkCardPayload {
  version: string;
  type: string;
  url: string;
  metadata: {
    title: string;
    description: string;
    author: string;
    publisher: string;
    thumbnail: string;
    icon: string;
  };
}

export default function BookmarkCard({ payload }: { payload: BookmarkCardPayload }) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        window.location.href = payload.url;
      }}
      className="relative h-40 transform-gpu cursor-pointer overflow-clip rounded-md border-2 border-gray-200 transition duration-300 hover:scale-[0.98] dark:border-gray-700"
    >
      <div className="absolute z-20 flex h-40 w-full flex-col justify-between p-6">
        <div className="flex flex-col justify-between">
          <span className="text-md line-clamp-1 font-bold sm:text-lg">{payload.metadata.title}</span>
          <span className="line-clamp-2 text-xs font-light text-gray-700 dark:text-gray-400 sm:text-sm">
            {payload.metadata.description}
          </span>
        </div>
        <div className="mt-2 inline-flex w-fit items-center overflow-clip rounded-md dark:bg-gray-700">
          <div className="mr-4">
            <img src={payload.metadata.icon} alt="bookmark icon" className="h-6" />
          </div>
          <span className="mr-4 line-clamp-1 text-xs">
            {payload.metadata.publisher} {payload.metadata.author !== null && <>• {payload.metadata.author}</>}
          </span>
        </div>
      </div>
      <div className="absolute z-10 flex h-40 w-full justify-end opacity-25">
        <img src={payload.metadata.thumbnail} alt="bookmark image" className="h-40 flex-shrink-0" />
      </div>
    </div>
  );
}
