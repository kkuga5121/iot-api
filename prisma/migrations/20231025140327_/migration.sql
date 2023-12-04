-- CreateTable
CREATE TABLE "Gateway" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "siteId" TEXT,

    CONSTRAINT "Gateway_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gateway_id_key" ON "Gateway"("id");

-- AddForeignKey
ALTER TABLE "devicesOwon" ADD CONSTRAINT "devicesOwon_gateway_ieee_fkey" FOREIGN KEY ("gateway_ieee") REFERENCES "Gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gateway" ADD CONSTRAINT "Gateway_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
