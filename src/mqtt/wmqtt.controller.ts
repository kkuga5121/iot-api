import { Controller, Get, Inject } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import {
    ClientProxy,
    MessagePattern,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('web mqtt')
@Controller('wmqtt')
export class WmqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly mqtttService: MqttService
    ) { }

    @Get()
    sendNotifications() {
        firstValueFrom(this.client.send('notifications/channels', 'web' + Math.random()))
        return this.mqtttService.getHello()
    }


}



