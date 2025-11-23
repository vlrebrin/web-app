-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'GUEST');

-- CreateTable
CREATE TABLE "Check" (
    "id" SERIAL NOT NULL,
    "summa" DOUBLE PRECISION NOT NULL DEFAULT 12000.2,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "isCommon" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "num" TEXT NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isRegistred" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metering" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL DEFAULT 0,
    "payment" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "contribution" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isNoValue" BOOLEAN NOT NULL DEFAULT true,
    "checkId" INTEGER NOT NULL,
    "counterId" INTEGER NOT NULL,

    CONSTRAINT "Metering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counter_num_key" ON "Counter"("num");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Counter" ADD CONSTRAINT "Counter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metering" ADD CONSTRAINT "Metering_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metering" ADD CONSTRAINT "Metering_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Counter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
