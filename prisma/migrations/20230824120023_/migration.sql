/*
  Warnings:

  - The primary key for the `devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the `group_device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_group_DeviceId_fkey";

-- AlterTable
ALTER TABLE "devices" DROP CONSTRAINT "devices_pkey",
DROP COLUMN "product_id",
DROP COLUMN "product_name",
ADD COLUMN     "productId" TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "devices_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "group_device";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_properties" (
    "dp_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "CustomName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,

    CONSTRAINT "product_properties_pkey" PRIMARY KEY ("dp_id")
);

-- CreateTable
CREATE TABLE "log_devices" (
    "id" TEXT NOT NULL,
    "dp_Id" TEXT,
    "value" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT,

    CONSTRAINT "log_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_devices" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_devices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_group_DeviceId_fkey" FOREIGN KEY ("group_DeviceId") REFERENCES "group_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_properties" ADD CONSTRAINT "product_properties_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_devices" ADD CONSTRAINT "log_devices_dp_Id_fkey" FOREIGN KEY ("dp_Id") REFERENCES "product_properties"("dp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_devices" ADD CONSTRAINT "log_devices_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
