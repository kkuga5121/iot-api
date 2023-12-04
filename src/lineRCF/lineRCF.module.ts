import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LineRCFController } from './lineRCF.controller';
import { LineRCFService } from './lineRCF.service';
@Module({
    controllers:[LineRCFController],
    providers: [LineRCFService, PrismaService]
})
export class LineRCFModule { }
