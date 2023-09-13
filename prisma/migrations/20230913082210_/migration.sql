/*
  Warnings:

  - Added the required column `deviceId` to the `smartIR_command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "smartIR_command" ADD COLUMN     "deviceId" TEXT NOT NULL;
