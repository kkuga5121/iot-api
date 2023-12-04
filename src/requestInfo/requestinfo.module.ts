import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestInfoService } from './requestinfo.service';
import { RequestInfoController } from './requestinfo.controller';
@Module({
    controllers:[RequestInfoController],
    providers: [RequestInfoService, PrismaService]
})
export class RequestInfoModule { }
