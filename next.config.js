/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { appDir: true, serverActions: true },
  images: {
    domains: ["vigue.me", "dnzye6trx9wog.cloudfront.net", "cdn.vigue.me", "images.weserv.nl"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        fs: "browserify-fs",
      });
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/post/:path*",
        destination: "/posts/:path*",
        permanent: true,
      },
      {
        source: "/socials",
        destination: "https://links.vigue.me",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "https://dnzye6trx9wog.cloudfront.net/Resume.pdf",
        permanent: true,
      },
      {
        source: "/sponsor",
        destination: "https://github.com/sponsors/acvigue",
        permanent: true,
      },
    ];
  },
};
