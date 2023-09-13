import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SmartIrComService } from './smartircom.service';
import { SmartIrComController } from './smartircom.controller';
@Module({
    controllers:[SmartIrComController],
    providers: [SmartIrComService, PrismaService]
})
export class SmartIrComModule { }