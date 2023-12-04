-- CreateTable
CREATE TABLE "line_RCF" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lineToken" TEXT NOT NULL,
    "rcfId" TEXT,

    CONSTRAINT "line_RCF_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "line_RCF" ADD CONSTRAINT "line_RCF_rcfId_fkey" FOREIGN KEY ("rcfId") REFERENCES "rcfsite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
