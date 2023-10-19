import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { DeviceService } from './device/device.service';
import { DeviceModule } from './device/device.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { LineModule } from './line/line.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LogService } from './log/log.service';
import { LogModule } from './log/log.module';
import { SiteModule } from './site/site.module';
import { SmartIrComModule } from './smartircom/smartircom.module';
import { validationSchema } from './configuration/validation';
import { HttpModule } from "@nestjs/axios";
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [MqttModule, 
     ConfigModule.forRoot(),
     DeviceModule, 
     PrismaModule, 
     ProductModule, 
     LogModule, 
     SiteModule,
     LineModule,
     SmartIrComModule,HttpModule,ScheduleModule.forRoot(),CronjobsModule
    ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
