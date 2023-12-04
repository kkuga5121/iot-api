import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceMQTT = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
      clean: true,
      connectTimeout: 4000,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 1000,
    }
  });
  app.use(cors(
      {
          origin: ['http://localhost:3001',
          'http://192.168.1.77:3001','http://192.168.1.41:3001',
          'http://192.168.1.111:3001','http://192.168.1.77:9000','http://trafficcenter.dvrdns.org:3001'],
          credentials: true,
          exposedHeaders: ["set-cookie"]
      }
  ));
  const config = new DocumentBuilder()
    .setTitle('IOT Platform')
    .setDescription('The IOT API description')
    .setVersion('1.0')
    .addTag('iot')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
