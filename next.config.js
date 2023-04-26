/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    domains: ["vigue.me", "blogcdn.vigue.me"],
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
        destination: "https://blogcdn.vigue.me/Resume.pdf",
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
