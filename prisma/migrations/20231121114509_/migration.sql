-- CreateTable
CREATE TABLE "logrcf" (
    "id" TEXT NOT NULL,
    "rcfId" TEXT,

    CONSTRAINT "logrcf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logrcf" ADD CONSTRAINT "logrcf_rcfId_fkey" FOREIGN KEY ("rcfId") REFERENCES "rcfsite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
