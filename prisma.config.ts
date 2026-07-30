import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { seed: "tsx prisma/seed.ts" },
  // Schema engine / migrations use the direct (unpooled) connection.
  datasource: { url: env("DIRECT_URL") },
});
