-- CreateTable
CREATE TABLE "devicesOwon" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "custom_name" TEXT,
    "ep" TEXT,
    "netDeviceType" TEXT,
    "linkStatus" TEXT,
    "deviceType" TEXT,
    "IASZoneType" TEXT,
    "ProfileId" TEXT,
    "clusterFlag" TEXT,
    "manuCode" TEXT,
    "devModel" TEXT,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "siteId" TEXT,
    "sensor_type" TEXT,

    CONSTRAINT "devicesOwon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devicesOwon_id_key" ON "devicesOwon"("id");

-- AddForeignKey
ALTER TABLE "devicesOwon" ADD CONSTRAINT "devicesOwon_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
