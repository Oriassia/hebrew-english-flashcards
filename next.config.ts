import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma's generated client and the pg driver out of the bundler so
  // they run as normal Node modules on the server.
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
};

export default nextConfig;
