-- CreateTable
CREATE TABLE "logreport_owon" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "command" TEXT,
    "message" TEXT,

    CONSTRAINT "logreport_owon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logreport_owon" ADD CONSTRAINT "logreport_owon_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devicesOwon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
