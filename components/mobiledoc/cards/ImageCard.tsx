/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import SmartImage from "@/components/SmartImage";

export interface Props {
  payload: {
    src: string;
    alt?: string;
    title: string;
    width: number;
    height: number;
    href?: string;
    srcset: any;
    key: number;
  }
}

export default function ImageCard(props: Props) {
  const payload = props.payload;
  const [open, setOpen] = useState(false);

  const lbImage: SlideImage = {
    src: payload.src,
    width: payload.width,
    height: payload.height,
    srcSet: payload.srcset
  }

  return (
    <div className="flex row justify-center">
      <SmartImage srcset={payload.srcset} sizes="90vw" alt={payload.alt} className='rounded-md' style={{maxHeight:payload.height}} loading="lazy" onClick={() => setOpen(true)}/>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[lbImage]}
        plugins={[Zoom]}
      />
    </div>
  );
}