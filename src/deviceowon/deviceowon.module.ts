import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceOwonService } from './deviceowon.service';
import { DeviceOwonController } from './deviceowon.controller';
@Module({
    controllers:[DeviceOwonController],
    providers: [DeviceOwonService, PrismaService]
})
export class DeviceOwonModule { }
