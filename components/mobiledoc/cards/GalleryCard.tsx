/* eslint-disable @next/next/no-img-element */
"use client";
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';

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
}



export default function GalleryCard(props: Props) {
  const payload = props.payload;

  return (
    <SlideshowLightbox className="flex gap-4 justify-between w-full max-w-full flex-wrap">
      {payload.images.map((image) => (
        <img src={image.src} key={image.src} alt='Image Gallery Item' className='rounded-md max-h-80 flex-grow object-cover'/>
      ))}
    </SlideshowLightbox>
  );
}