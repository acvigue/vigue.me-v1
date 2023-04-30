/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
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

const responsiveImage = function({ slide, rect }) {
  const sources = slide;

  if(sources == undefined) {
      return (<div></div>);
  }

  return (
      <picture>
          {Object.keys(sources).map((format) => (
              <source
                  type={format}
                  key={format}
                  srcSet={sources[format].srcSet}
                  sizes={sources[format].sizes}
              />
          ))}
          <img src={sources.fallback} alt="" />
      </picture>
  );
}

export default function ImageCard(props: Props) {
  const payload = props.payload;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex row justify-center">
      <SmartImage fallback={payload.src} sources={payload.srcset} alt={payload.alt} className='rounded-md w-max' onClick={() => setOpen(true)}/>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[payload.srcset]}
        render={{ slide: responsiveImage }}
      />
    </div>
  );
}