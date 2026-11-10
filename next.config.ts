import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Scoped to the single file that needs Tailwind's `@import "tailwindcss"`
      // processed. A bare "*.css" here would also swallow every *.module.css
      // file, stripping Turbopack's built-in CSS Modules scoping (every
      // `styles.foo` import came back `undefined` because of this).
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
