import { Controller, Get, Inject } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import {
    ClientProxy,
    MessagePattern,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'


@Controller()
export class MqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly mqtttService: MqttService
    ) { }


    @MessagePattern('mqtt', Transport.MQTT)
    getNotifications(@Payload() data) {
        return firstValueFrom(this.client.send('mqtt/message', 'message : ' + Math.random()))
    }

    @MessagePattern('site_1/#', Transport.MQTT)
    all(@Payload() data) {
        console.log(data);
    }
}



