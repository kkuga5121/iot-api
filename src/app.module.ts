import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceService } from './device/device.service';
import { DeviceModule } from './device/device.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LogService } from './log/log.service';
import { LogModule } from './log/log.module';
@Module({
  imports: [MqttModule, ConfigModule.forRoot(), DeviceModule, PrismaModule, ProductModule, LogModule],
  controllers: [AppController],
  providers: [AppService, DeviceModule, ProductService, PrismaService, LogService],
})
export class AppModule { }
