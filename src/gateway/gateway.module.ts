import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
@Module({
    controllers:[GatewayController],
    providers: [GatewayService, PrismaService]
})
export class GatewayModule { }
