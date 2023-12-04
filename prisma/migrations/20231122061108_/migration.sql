/*
  Warnings:

  - Changed the type of `powerStatus` on the `logrcf` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "logrcf" DROP COLUMN "powerStatus",
ADD COLUMN     "powerStatus" JSONB NOT NULL;
