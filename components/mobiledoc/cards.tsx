import React from 'react';

import ImageCard from './cards/ImageCard';
import GalleryCard from './cards/GalleryCard';
import EmbedCard from './cards/EmbedCard';
import CodeCard from './cards/CodeCard';
import BookmarkCard from './cards/BookmarkCard';
import MarkdownCard from './cards/MarkdownCard';
import DividerCard from './cards/DividerCard';
import ButtonCard from './cards/ButtonCard';
import CalloutCard from './cards/CalloutCard';
import ToggleCard from './cards/ToggleCard';
import VideoCard from './cards/VideoCard';
import { getResizedImageURLS } from '@/lib/imgproxy';

interface CardProperties {
  env: Object;
  payload: Object;
}

const cardRenderer = function (Wrapper, name) {
  const component = function ({ env, payload }) {
    return <Wrapper payload={payload} key={payload.key} className="w-full" />;
  }
  
  component.displayName = `RenderedCard_${Wrapper.displayName || "unknown"}`;
  return component;
}

function renderComponentAsCard(Wrapper, name: String) {
  return {
    name,
    type: 'dom',
    render: cardRenderer(Wrapper, name)
  };
}

const cards = [
  renderComponentAsCard(ImageCard, "image"),
  renderComponentAsCard(GalleryCard, "gallery"),
  renderComponentAsCard(EmbedCard, "html"),
  renderComponentAsCard(CodeCard, "code"),
  renderComponentAsCard(BookmarkCard, "bookmark"),
  renderComponentAsCard(MarkdownCard, "markdown"),
  renderComponentAsCard(DividerCard, "hr"),
  renderComponentAsCard(ButtonCard, "button"),
  renderComponentAsCard(CalloutCard, "callout"),
  renderComponentAsCard(ToggleCard, "toggle"),
  renderComponentAsCard(VideoCard, "video")
];

export default cards;