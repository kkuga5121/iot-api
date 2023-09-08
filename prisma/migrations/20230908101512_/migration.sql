-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "siteId" TEXT;

-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sites_id_key" ON "sites"("id");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
