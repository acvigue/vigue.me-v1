import Script from "next/script";

export function GhostContent({ html }) {
  let h = html.replaceAll(`<input type="range" class="kg-video-volume-slider" max="100" value="100">`,`<input type="range" class="kg-video-volume-slider" max="100" defaultValue="100">`);
  h = h.replaceAll(`<input type="range" class="kg-video-seek-slider" max="100" value="0">`,`<input type="range" class="kg-video-seek-slider" max="100" defaultValue="0">`);
  h = h.replaceAll(`<hr>`, `<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">`)
  h = h.replaceAll(`<img`, `<img class="rounded" loading="lazy"`)
  h = h.replaceAll(`<video`, `<video type="video/mp4"`)
  return (
    <>
      <div className="gh-content" dangerouslySetInnerHTML={{__html: h}} />
    </>
  );
}