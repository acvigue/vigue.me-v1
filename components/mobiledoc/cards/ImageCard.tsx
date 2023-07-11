/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import SmartImage from "@/components/SmartImage";

export interface ImageCardPayload {
  src: string;
  alt?: string;
  title: string;
  width: number;
  height: number;
  href?: string;
  srcset: any;
  key: number;
}

export default function ImageCard({ payload }: { payload: ImageCardPayload }) {
  const [open, setOpen] = useState(false);

  const lbImage: SlideImage = {
    src: payload.src,
    width: payload.width,
    height: payload.height,
    srcSet: payload.srcset
  }

  return (
    <div className="flex row justify-center">
      <div className="relative group hover:scale-[0.98] transition transform-gpu duration-300">
        <div className="absolute w-full h-full bg-gray-500 opacity-20 dark:opacity-25 -rotate-2 rounded group-hover:rotate-0 transition transform-gpu duration-300"></div>
        <div className="relative">
          <SmartImage srcset={payload.srcset} sizes="90vw" alt={payload.alt} className='rounded-md object-fit group-hover:scale-1' style={{ maxHeight: 500 }} loading="lazy" onClick={() => setOpen(true)} />
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[lbImage]}
            plugins={[Zoom]}
          />
        </div>
      </div>
    </div>
  );
}