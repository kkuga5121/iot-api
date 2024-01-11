-- AlterTable
ALTER TABLE "rcfsite" ADD COLUMN     "door_id" TEXT;

-- AddForeignKey
ALTER TABLE "rcfsite" ADD CONSTRAINT "rcfsite_door_id_fkey" FOREIGN KEY ("door_id") REFERENCES "devicesOwon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
