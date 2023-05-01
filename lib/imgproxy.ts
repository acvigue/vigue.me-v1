import pb, { FormatOptions, ResizeType } from "@bitpatty/imgproxy-url-builder";

const numSizes = 6;
const formats = ["webp", "jpg"];

export function getResizedImageURLS(url: string, width: number, height: number) {
  const urls = {};
  const sizes = [];

  for (let i = 1; i <= numSizes; i++) {
    sizes.push({ width: width / i, height: height / i });
  }

  for(const format of formats) {
    const mime = format == "jpg" ? "image/jpeg" : `image/${format}`;
    urls[mime] = {};
    const srcs = [];
    const breakSizes = [];

    for(const [i, size] of sizes.entries()) {
      const temp = pb()
        .format(format as FormatOptions)
        .quality(65-(i*10))
        .resize({
          type: ResizeType.AUTO,
          width: Math.round(size.width),
          height: Math.round(size.height),
        })
        .build({
          path: url.replace('https://dnzye6trx9wog.cloudfront.net', 's3://blogcdn-vigue-me'),
          signature: {
            key: process.env.IMGPROXY_KEY,
            salt: process.env.IMGPROXY_SALT,
            size: 32, // Optional, specify the signature size. Defaults to 32
          },
        });
      srcs.push(`${process.env.IMGPROXY_URL}${temp} ${Math.round(size.width)}w`);
      breakSizes.push(`(max-width: ${Math.round(size.width)}px) ${Math.round(size.width)}px`);
    };
    urls[mime]["srcSet"] = srcs.join(", ");
    urls[mime]["sizes"] = "100vw";
  }

  return urls;
}

