/* eslint-disable @next/next/no-img-element */
"use client";

import { SlideshowLightbox } from "lightbox.js-react";
import 'lightbox.js-react/dist/index.css'

export interface Props {
  payload: {
    src: string;
    alt?: string;
    title: string;
    width: number;
    height: number;
    href?: string;
    key: number;
  }
}

export default function ImageCard(props: Props) {
  const payload = props.payload;

  return (
    <SlideshowLightbox className="flex row justify-center">
      <img src={payload.src} alt={payload.alt} className='rounded-md w-max' />
    </SlideshowLightbox>
  );
}