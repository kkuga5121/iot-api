import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SiteService } from './site.service';

@Module({
    providers: [SiteService, PrismaService]
})
export class SiteModule { }
