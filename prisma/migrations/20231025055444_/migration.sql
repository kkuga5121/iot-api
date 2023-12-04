/*
  Warnings:

  - The primary key for the `devicesOwon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ieee` on the `devicesOwon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `devicesOwon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `devicesOwon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "devicesOwon_ieee_key";

-- AlterTable
ALTER TABLE "devicesOwon" DROP CONSTRAINT "devicesOwon_pkey",
DROP COLUMN "ieee",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "devicesOwon_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "devicesOwon_id_key" ON "devicesOwon"("id");
