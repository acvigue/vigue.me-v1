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
  async rewrites() {
    return [
      {
        source: "/feed/:format*",
        destination: "/api/feed?f=:format*",
      },
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/.well-known/robots.txt",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/post/:path*",
        destination: "/posts/:path*",
        permanent: true,
      },
      {
        source: "/socials-ring",
        destination: "https://links.vigue.me",
        permanent: false,
      },
      {
        source: "/sponsor",
        destination: "https://github.com/sponsors/acvigue",
        permanent: true,
      },
    ];
  },
};
