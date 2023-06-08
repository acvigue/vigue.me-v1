/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import PhotoAlbum, { RenderPhoto, Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
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

export default function GalleryCard(props: Props) {
  const [index, setIndex] = useState(-1);

  const albumImages: Photo[] = props.payload.images.map((image) => {
    return {
      srcSet: image.srcset,
      src: image.src,
      width: image.width,
      height: image.height
    }
  })

  return (
    <div>
      <PhotoAlbum layout="rows" photos={albumImages} onClick={({ index }) => setIndex(index)} />
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={albumImages}
        plugins={[Zoom, Counter]}
      />
    </div>
  );
}