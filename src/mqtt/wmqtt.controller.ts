import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import {
    ClientProxy,
    MessagePattern,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { mqttDeviceDto } from './dto/mqtt.dto';

@ApiTags('web mqtt')
@Controller('wmqtt')
export class WmqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly mqtttService: MqttService
    ) { }

    @Get()
    sendNotifications() {
        firstValueFrom(this.client.send('mqtt/message', 'web' + Math.random()))
        return this.mqtttService.getHello()
    }
    @Post()
    @ApiBody({})
    sendAction(@Query() query: mqttDeviceDto, @Body() body) {
        firstValueFrom(this.client.send(`sensor/${query.deviceId}/action`, body))
        return { deviceId: query.deviceId, body }
    }

}



