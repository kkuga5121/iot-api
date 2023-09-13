-- CreateTable
CREATE TABLE "smartIR_command" (
    "id" TEXT NOT NULL,
    "name_type" TEXT NOT NULL,
    "remote_id" TEXT NOT NULL,
    "head" TEXT NOT NULL,
    "name_com" TEXT NOT NULL,
    "command" TEXT NOT NULL,

    CONSTRAINT "smartIR_command_pkey" PRIMARY KEY ("id")
);
