/*
  Warnings:

  - The `ep` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netDeviceType` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `linkStatus` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deviceType` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `IASZoneType` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ProfileId` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `clusterFlag` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `manuCode` column on the `devicesOwon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "devicesOwon" DROP COLUMN "ep",
ADD COLUMN     "ep" INTEGER,
DROP COLUMN "netDeviceType",
ADD COLUMN     "netDeviceType" INTEGER,
DROP COLUMN "linkStatus",
ADD COLUMN     "linkStatus" BOOLEAN,
DROP COLUMN "deviceType",
ADD COLUMN     "deviceType" INTEGER,
DROP COLUMN "IASZoneType",
ADD COLUMN     "IASZoneType" INTEGER,
DROP COLUMN "ProfileId",
ADD COLUMN     "ProfileId" INTEGER,
DROP COLUMN "clusterFlag",
ADD COLUMN     "clusterFlag" INTEGER,
DROP COLUMN "manuCode",
ADD COLUMN     "manuCode" INTEGER;
