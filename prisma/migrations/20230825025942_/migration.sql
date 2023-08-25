/*
  Warnings:

  - You are about to drop the column `dp_id` on the `log_devices` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `log_devices` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `log_devices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "log_devices" DROP COLUMN "dp_id",
DROP COLUMN "timeStamp",
DROP COLUMN "value";

-- CreateTable
CREATE TABLE "log_properties" (
    "id" TEXT NOT NULL,
    "dp_id" TEXT NOT NULL,
    "value" TEXT,
    "logDeviceId" TEXT,

    CONSTRAINT "log_properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log_properties" ADD CONSTRAINT "log_properties_logDeviceId_fkey" FOREIGN KEY ("logDeviceId") REFERENCES "log_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
