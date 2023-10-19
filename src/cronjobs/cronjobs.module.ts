import { Module   } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsService } from './cronjobs.service';
import { lineService } from 'src/line/line.service';
 import { HttpModule } from '@nestjs/axios';
import { LineModule } from 'src/line/line.module';
import { LogModule } from 'src/log/log.module';
import { LogService } from 'src/log/log.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceService } from 'src/device/device.service';
@Module({
  imports:[
    ScheduleModule,
    HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      })
      ,LineModule,LogModule
  ],
  providers: [CronjobsService,lineService,LogService,PrismaService,DeviceService],
})
export class CronjobsModule {}