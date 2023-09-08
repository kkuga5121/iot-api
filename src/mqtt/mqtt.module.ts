import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { DeviceService } from '../device/device.service'
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule } from '@nestjs/config';
import { WmqttController } from './wmqtt.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { LogService } from 'src/log/log.service';
import { OutboundResponseSerializer } from './outboundResponseSerializer';
@Module({
  imports: [ConfigModule.forRoot(), ClientsModule.register([
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
    }
  ])],
  controllers: [MqttController, WmqttController],
  providers: [MqttService, DeviceService, PrismaService, ProductService, LogService]
})
export class MqttModule { }
