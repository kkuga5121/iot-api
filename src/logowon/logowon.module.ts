import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogOwonService } from './logowon.service';
import { LogOwonController } from './logowon.controller';
@Module({
    controllers:[LogOwonController],
    providers: [LogOwonService, PrismaService]
})
export class LogOwonModule { }
