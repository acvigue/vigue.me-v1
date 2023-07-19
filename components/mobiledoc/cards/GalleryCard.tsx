/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import PhotoAlbum, { RenderPhoto, Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import SmartImage from "@/components/SmartImage";

export interface GalleryCardPayload {
  images: Image[];
  key: number;
}

interface Image {
  fileName: string;
  row: number;
  width: number;
  height: number;
  src: string;
  title: string;
  srcset: any;
}

const renderPhoto: RenderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => {
  return (
    <div
      className="row flex justify-center"
      style={{
        boxSizing: "content-box",
        alignItems: "center",
        width: style?.width,
        padding: `${layoutOptions.padding - 2}px`,
        paddingBottom: 0,
      }}
    >
      <div className="group relative transform-gpu transition duration-300 hover:scale-[0.98]">
        <div className="absolute h-full w-full -rotate-2 transform-gpu rounded bg-gray-500 opacity-20 transition duration-300 group-hover:rotate-0 dark:opacity-25"></div>
        <div className="relative">
          <img
            sizes="90vw"
            alt={alt}
            className="object-fit"
            style={{ ...style, width: "100%", padding: 0, borderRadius: "0.375rem", maxHeight: 500 }}
            {...restImageProps}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default function GalleryCard({ payload }: { payload: GalleryCardPayload }) {
  const [index, setIndex] = useState(-1);

  const albumImages: Photo[] = payload.images.map((image) => {
    return {
      srcSet: image.srcset,
      src: image.src,
      width: image.width,
      height: image.height,
    };
  });

  return (
    <div>
      <PhotoAlbum layout="rows" photos={albumImages} renderPhoto={renderPhoto} onClick={({ index }) => setIndex(index)} />
      <Lightbox open={index >= 0} close={() => setIndex(-1)} slides={albumImages} plugins={[Zoom, Counter]} />
    </div>
  );
}
