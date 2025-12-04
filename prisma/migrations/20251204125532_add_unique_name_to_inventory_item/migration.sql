/*
  Warnings:

  - You are about to drop the column `modelType` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `foreman` on the `work_logs` table. All the data in the column will be lost.
  - You are about to drop the column `reportBreak` on the `work_logs` table. All the data in the column will be lost.
  - You are about to drop the `_DriverToVehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `vehicleId` on table `work_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."_DriverToVehicle" DROP CONSTRAINT "_DriverToVehicle_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DriverToVehicle" DROP CONSTRAINT "_DriverToVehicle_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."services" DROP CONSTRAINT "services_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."work_logs" DROP CONSTRAINT "work_logs_driverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."work_logs" DROP CONSTRAINT "work_logs_vehicleId_fkey";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "modelType",
DROP COLUMN "notes",
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "model" TEXT,
ALTER COLUMN "mileage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "work_logs" DROP COLUMN "foreman",
DROP COLUMN "reportBreak",
ADD COLUMN     "workerId" TEXT,
ALTER COLUMN "vehicleId" SET NOT NULL,
ALTER COLUMN "breakTime" DROP NOT NULL,
ALTER COLUMN "breakTime" SET DATA TYPE TEXT,
ALTER COLUMN "difference" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "public"."_DriverToVehicle";

-- DropTable
DROP TABLE "public"."account";

-- DropTable
DROP TABLE "public"."services";

-- DropTable
DROP TABLE "public"."session";

-- DropTable
DROP TABLE "public"."user";

-- DropTable
DROP TABLE "public"."verification";

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "hourlyRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employmentStart" TIMESTAMP(3),

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "workerId" TEXT,
    "vehicleId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentItem" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "AssignmentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_name_key" ON "InventoryItem"("name");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentItem" ADD CONSTRAINT "AssignmentItem_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentItem" ADD CONSTRAINT "AssignmentItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_logs" ADD CONSTRAINT "work_logs_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_logs" ADD CONSTRAINT "work_logs_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_logs" ADD CONSTRAINT "work_logs_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
