import { Module } from '@nestjs/common';
import { DeviceService } from '../device/device.service'
import { PrismaService } from '../prisma/prisma.service';
import { LogService } from './log.service';
import { LogController } from './log.controller';
@Module({
    controllers: [LogController],
    providers: [DeviceService, PrismaService, LogService]
})
export class LogModule { }
