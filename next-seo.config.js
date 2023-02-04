import config from "@/config";

const title = config.name;
const description = config.description;
const DefaultSEO = {
  useAppDir: true,
  title,
  titleTemplate: `%s - ${title}`,
  description,
  // disabled due to `double canocial address` error
  // canonical: config.baseUrl,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.baseUrl,
    title,
    description,
    images: [
      {
        url: config.baseUrl + "/og.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default DefaultSEO;
