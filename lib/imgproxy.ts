import pb, { ResizeType } from "@bitpatty/imgproxy-url-builder";

const numSizes = 6;

interface Srcset {
  src: string;
  width: number;
  height: number;
}

export function getResizedImageURLS(url: string, width: number, height: number) {
  const srcs: Srcset[] = [];
  const sizes = [];

  for (let i = 1; i <= numSizes; i++) {
    sizes.push({ width: width / i, height: height / i });
  }

  for (const [i, size] of sizes.entries()) {
    const temp = pb()
      .quality(65 - i * 10)
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
      
    const src: Srcset = {
      src: `${process.env.IMGPROXY_URL}${temp}`,
      width: size.width,
      height: size.height,
    };
    srcs.push(src);
  }
  return srcs;
}

