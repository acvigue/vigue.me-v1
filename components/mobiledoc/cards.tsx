import ImageCard from "./cards/ImageCard";
import GalleryCard from "./cards/GalleryCard";
import EmbedCard from "./cards/EmbedCard";
import CodeCard from "./cards/CodeCard";
import BookmarkCard from "./cards/BookmarkCard";
import MarkdownCard from "./cards/MarkdownCard";
import DividerCard from "./cards/DividerCard";
import ButtonCard from "./cards/ButtonCard";
import CalloutCard from "./cards/CalloutCard";
import ToggleCard from "./cards/ToggleCard";
import VideoCard from "./cards/VideoCard";
import SignupCard from "./cards/SignupCard";

const cards = {
  image: ImageCard,
  gallery: GalleryCard,
  html: EmbedCard,
  code: CodeCard,
  bookmark: BookmarkCard,
  markdown: MarkdownCard,
  hr: DividerCard,
  button: ButtonCard,
  callout: CalloutCard,
  toggle: ToggleCard,
  video: VideoCard,
  signup: SignupCard,
};

export default cards;
