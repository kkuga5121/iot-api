/*
  Warnings:

  - You are about to drop the column `category` on the `group_devices` table. All the data in the column will be lost.
  - You are about to drop the `catagorys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupDevice` to the `group_devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_categoryId_fkey";

-- AlterTable
ALTER TABLE "group_devices" DROP COLUMN "category",
ADD COLUMN     "groupDevice" TEXT NOT NULL;

-- DropTable
DROP TABLE "catagorys";

-- CreateTable
CREATE TABLE "catagories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catagories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "catagories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
