/*
  Warnings:

  - You are about to drop the column `CustomName` on the `product_properties` table. All the data in the column will be lost.
  - Added the required column `custom_name` to the `product_properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_properties" DROP COLUMN "CustomName",
ADD COLUMN     "custom_name" TEXT NOT NULL;
