import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Runtime queries use the pooled DATABASE_URL via the pg driver adapter.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForDb = globalThis as unknown as { db?: PrismaClient };

export const db = globalForDb.db ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
