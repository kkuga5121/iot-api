import { Module   } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsService } from './cronjobs.service';
import { lineService } from 'src/line/line.service';
 import { HttpModule } from '@nestjs/axios';
 import { ConfigModule } from '@nestjs/config';
import { LineModule } from 'src/line/line.module';
import { LogModule } from 'src/log/log.module';
import { LogService } from 'src/log/log.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { DeviceService } from 'src/device/device.service';
import { OutboundResponseSerializer } from 'src/mqtt/outboundResponseSerializer';
import { GatewayService } from 'src/gateway/gateway.service';
import { DeviceOwonService } from 'src/deviceowon/deviceowon.service';
import { RCFSiteService } from 'src/RCFSite/rcfsite.service';
import { LogOwonService } from 'src/logowon/logowon.service';
import { LogOwonRCFService } from 'src/logOwonRCF/logowonrcf.service';
@Module({
  imports:[ConfigModule.forRoot(), ClientsModule.register([
    {
      name: "MQTT_SERVICE",
      transport: Transport.MQTT,
      options: {
        url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
        connectTimeout: 4000,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        reconnectPeriod: 1000,
        serializer: new OutboundResponseSerializer()
      }
    }]),
    ScheduleModule,
    HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      })
      ,LineModule,LogModule
  ],
  providers: [CronjobsService,RCFSiteService,LogOwonService,LogOwonRCFService,
    lineService,LogService,PrismaService,GatewayService,DeviceOwonService,DeviceService],
})
export class CronjobsModule {}