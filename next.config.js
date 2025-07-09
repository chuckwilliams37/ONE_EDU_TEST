/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Provide fallbacks for optional ws dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
      fs: false,
      net: false,
      tls: false,
    };

    // Ignore webpack warnings for dynamic requires
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
