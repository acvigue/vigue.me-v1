/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import PhotoAlbum, { RenderPhoto, Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
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
  srcset: any;
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
      onClick={restImageProps.onClick}
    >
      <picture>
        {Object.keys(sources).map((format) => (
          <source
            type={format}
            key={format}
            srcSet={sources[format].srcSet}
          />
        ))}
        <img src={sources.fallback} alt={alt} loading="lazy" style={{ ...style, width: "100%", padding: 0 }} {...restImageProps} />
      </picture>
    </div>);
};

const responsiveImage = function ({ slide, rect }) {
  const sources = slide;

  if (sources == undefined) {
    return (<div></div>);
  }

  return (
    <picture>
      {Object.keys(sources).map((format) => (
        <source
          type={format}
          key={format}
          srcSet={sources[format].srcSet}
        />
      ))}
      <img src={sources.fallback} alt="" />
    </picture>
  );
}

export default function GalleryCard(props: Props) {
  const payload = props.payload;

  const [index, setIndex] = useState(-1);
  const srcsets = props.payload.images.map((image) => {
    return image.srcset;
  })

  return (
    <div>
      <PhotoAlbum layout="rows" photos={payload.images} renderPhoto={renderPhoto2} onClick={({ index }) => setIndex(index)} />
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={srcsets}
        render={{ slide: responsiveImage }}
        plugins={[Zoom]}
        animation={{ zoom: 500 }}
        zoom={{
          maxZoomPixelRatio: 1,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </div>
  );
}