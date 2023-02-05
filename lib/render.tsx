import Script from "next/script";

export function GhostContent({ html }) {
  let h = html.replaceAll(`<input type="range" class="kg-video-volume-slider" max="100" value="100">`,`<input type="range" class="kg-video-volume-slider" max="100" defaultValue="100">`);
  h = h.replaceAll(`<input type="range" class="kg-video-seek-slider" max="100" value="0">`,`<input type="range" class="kg-video-seek-slider" max="100" defaultValue="0">`);
  h = h.replaceAll(`<hr>`, `<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">`)
  h = h.replaceAll(`<img`, `<img class="rounded" loading="lazy"`)
  return (
    <>
      <Script src="/cards.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></Script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/plugins/line-numbers/prism-line-numbers.min.css" />
      <div className="gh-content" dangerouslySetInnerHTML={{__html: h}} />
    </>
  );
}