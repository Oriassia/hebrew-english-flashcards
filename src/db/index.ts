import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Runtime queries use the pooled DATABASE_URL via the pg driver adapter.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL env var");
}

const adapter = new PrismaPg({ connectionString });

const globalForDb = globalThis as unknown as { db?: PrismaClient };

export const db = globalForDb.db ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
