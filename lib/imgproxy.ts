import pb, { FormatOptions, ResizeType } from "@bitpatty/imgproxy-url-builder";

export function getResizedImageURLS(url: string, width: number, height: number, sizes="100vw") {
  const numSizes = 6;
  const formats = ["avif", "webp", "jpg"];
  const x_sizes = [];
  const urls = {};

  for (let i = 1; i <= numSizes; i++) {
    x_sizes.push({ width: width / 2^i, height: height / 2^i });
  }

  for(const format of formats) {
    const mime = format == "jpg" ? "image/jpeg" : `image/${format}`;
    urls[mime] = {};
    const srcs = [];
    const breakSizes = [];

    for(const [i, size] of x_sizes.entries()) {
      const temp = pb()
        .format(format as FormatOptions)
        .quality(75)
        .resize({
          type: ResizeType.AUTO,
          width: Math.round(size.width),
          height: Math.round(size.height),
        })
        .build({
          path: url,
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
    urls[mime]["sizes"] = sizes;
  }

  return urls;
}

