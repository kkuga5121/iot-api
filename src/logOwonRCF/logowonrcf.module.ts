import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogOwonRCFService } from './logowonrcf.service';
import { LogOwonRCFController } from './logowonrcf.controller';
@Module({
    controllers:[LogOwonRCFController],
    providers: [LogOwonRCFService, PrismaService]
})
export class LogOwonRCFModule { }
