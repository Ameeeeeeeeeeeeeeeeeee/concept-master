import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

try {
  // Try to initialize Prisma Client
  // If DATABASE_URL is missing or invalid, this might normally throw
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
} catch (e) {
  console.error("⚠️ Prisma Client Init Failed - Database features disabled:", e);
  
  // Return a safe Proxy that throws explicit error only when accessed
  // This allows the app to start and serve AI features without a DB
  prismaInstance = new Proxy({}, {
    get: (_, prop) => {
      if (prop === 'then') return undefined; // Promise safety
      return () => {
        throw new Error("Database not connected. Please set up Postgres or check .env");
      };
    }
  }) as unknown as PrismaClient;
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
