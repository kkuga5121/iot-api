/*
  Warnings:

  - Made the column `deviceId` on table `log_devices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "log_devices" DROP CONSTRAINT "log_devices_deviceId_fkey";

-- AlterTable
ALTER TABLE "log_devices" ALTER COLUMN "deviceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "log_devices" ADD CONSTRAINT "log_devices_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
