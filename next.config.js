/** @type {import('next').NextConfig} */

// const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");

const nextConfig = {
  reactStrictMode: true,
  // next.config.js

  images: {
    domains: ["randomuser.me"],
    loader: "custom",
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
// module.exports = withPlugins([
//   [
//     optimizedImages,
//     {
//       // all other plugins will go here
//       reactStrictMode: true,
//       // next.config.js

//       images: {
//         domains: ["randomuser.me"],
//         loader: "custom",
//         disableStaticImages: true,
//       },
//     },
//   ],
// ]);
