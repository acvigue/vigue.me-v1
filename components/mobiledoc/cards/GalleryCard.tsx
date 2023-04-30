/* eslint-disable @next/next/no-img-element */
"use client";

import PhotoAlbum, { RenderPhoto, Photo } from "react-photo-album";

export interface Props {
  payload: {
    images: Image[]
    key: number;
  }
}

interface Image {
  fileName: string;
  row: number;
  width: number;
  height: number;
  src: string;
  title: string;
}

const renderPhoto2: RenderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => {
  const sources = JSON.parse(restImageProps.title);
  return (
    <div
      style={{
        boxSizing: "content-box",
        alignItems: "center",
        width: style?.width,
        padding: `${layoutOptions.padding - 2}px`,
        paddingBottom: 0,
      }}
    >
      <picture>
        {Object.keys(sources).map((format) => (
          <source
            type={format}
            key={format}
            srcSet={sources[format].srcSet}
            sizes={sources[format].sizes}
          />
        ))}
        <img src={sources.fallback} alt={alt} style={{ ...style, width: "100%", padding: 0 }} {...restImageProps} />
      </picture>
    </div>);
};

export default function GalleryCard(props: Props) {
  const payload = props.payload;
  console.log(JSON.stringify(props));

  return (
    <PhotoAlbum layout="rows" photos={payload.images} renderPhoto={renderPhoto2} />
  );
}