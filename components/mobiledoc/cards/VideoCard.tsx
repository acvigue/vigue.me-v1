"use client";

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

export interface Props {
  payload: {
    loop: boolean;
    src: string;
    thumbnailSrc: string;
    mimeType: string;
    key: number;
  }
}

var canUseDOM = !!(
  (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);

export default function VideoCard(props: Props) {
  const payload = props.payload;

  const controls = ['PlayPause', 'Seek', 'Time', 'Fullscreen'];
  if (!payload.loop) {
    controls.push('Volume');
  }

  if (canUseDOM) {
    return (
      <Video autoPlay={payload.loop} loop={payload.loop} muted={payload.loop}
        controls={controls} poster={payload.thumbnailSrc}>
        <source src={payload.src} type={payload.mimeType} />
      </Video>
    );
  } else {
    return (<div></div>)
  }
}