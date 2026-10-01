import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The policies live with the app, which bills; these footer links 404'd.
  async redirects() {
    return [
      { source: "/privacy", destination: "https://app.drawwise.ai/legal/privacy.html", permanent: false },
      { source: "/terms", destination: "https://app.drawwise.ai/legal/terms.html", permanent: false },
      { source: "/refund-policy", destination: "https://app.drawwise.ai/legal/refund-policy.html", permanent: false },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
