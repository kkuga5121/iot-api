-- AddForeignKey
ALTER TABLE "rcfsite" ADD CONSTRAINT "rcfsite_powermain_id_fkey" FOREIGN KEY ("powermain_id") REFERENCES "devicesOwon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rcfsite" ADD CONSTRAINT "rcfsite_powerats_id_fkey" FOREIGN KEY ("powerats_id") REFERENCES "devicesOwon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rcfsite" ADD CONSTRAINT "rcfsite_temp_id_fkey" FOREIGN KEY ("temp_id") REFERENCES "devicesOwon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
