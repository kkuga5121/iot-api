import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RCFSiteService } from './rcfsite.service';
import { RCFSiteController } from './rcfsite.controller';
@Module({
    controllers:[RCFSiteController],
    providers: [RCFSiteService, PrismaService]
})
export class RCFSiteModule { }
