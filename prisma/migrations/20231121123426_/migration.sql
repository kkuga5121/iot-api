/*
  Warnings:

  - Added the required column `powerStatus` to the `logrcf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `logrcf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logrcf" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "powerATS_Data" JSONB,
ADD COLUMN     "powerMain_Data" JSONB,
ADD COLUMN     "powerStatus" TEXT NOT NULL,
ADD COLUMN     "temp_Data" JSONB,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
