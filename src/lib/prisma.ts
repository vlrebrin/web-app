//"use server"
import { PrismaClient } from "@prisma/client";

// import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'
// const prisma = new PrismaClient().$extends(withAccelerate())
// const globalForPrisma = global as unknown as { prisma: typeof prisma }

//const prisma = new PrismaClient()
//const globalForPrisma = global as unknown as { prisma: typeof prisma }
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

//export default prisma


// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ["error"],
//   });

// if (process.env.NODE_ENV != "production") globalForPrisma.prisma = prisma;
