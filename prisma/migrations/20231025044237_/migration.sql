-- CreateTable
CREATE TABLE "rcfsite" (
    "id" TEXT NOT NULL,
    "siteId" TEXT,
    "powermain_id" TEXT,
    "powergen_id" TEXT,
    "temp_id" TEXT,

    CONSTRAINT "rcfsite_pkey" PRIMARY KEY ("id")
);
