import ImageCard from './cards/ImageCard';
import GalleryCard from './cards/GalleryCard';
import React from 'react';

interface CardProperties {
  env: Object;
  payload: Object;
}

const cardRenderer = function (Wrapper) {
  const component = function ({ env, payload }) {
    const props = {
      payload
    };

    return <Wrapper {...props} key={payload.key} className="w-full" />;
  }
  
  component.displayName = `RenderedCard_${Wrapper.displayName || "unknown"}`;
  return component;
}

function renderComponentAsCard(Wrapper, name: String) {
  return {
    name,
    type: 'dom',
    render: cardRenderer(Wrapper)
  };
}

const cards = [
  renderComponentAsCard(ImageCard, "image"),
  renderComponentAsCard(GalleryCard, "gallery"),
];

export default cards;