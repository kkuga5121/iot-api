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
import { mqttDeviceDto ,mqttDeviceOwon,mqttDeviceOwonName} from './dto/mqtt.dto';
import { DeivceById } from 'src/deviceowon/dto/deviceowon.dto';

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
        return "hello"
    }
    @Post()
    @ApiBody({})
    sendAction(@Query() query: mqttDeviceDto, @Body() body) {
        firstValueFrom(this.client.send(`sensor/${query.deviceId}/action`, body))
        return { deviceId: query.deviceId, body }
    }
    
    @Post('deviceOwonSetName')
    @ApiBody({})
    setNameDeviceAction(@Query() query: mqttDeviceOwonName, @Body() body) {
        firstValueFrom(this.client.send(`api/device/${query.gateway_ieee}/setName`, body))
        
        // let s:any = 
        // {
        //     "type":"zigbeeConfig",
        //     "command":"epList",
        //     "session":"1peem39po1ilnk9",
        //     "sequence":7777
        // }
        // firstValueFrom(this.client.send(`api/device/`+query.gateway_ieee+`/deviceList`, s))

        return { gateway_ieee: query.gateway_ieee, body }
    }
    @Post('requestDeviceOwonValue')
    @ApiBody({})
    requestDeviceOwonValue(@Query() query: mqttDeviceOwon, @Body() body){
        firstValueFrom(this.client.send(`api/device/${query.gateway_ieee}/action`, body))

        
        return { deviceId: query.deviceId, body }
    }
    @Get('delete')
    @ApiQuery({ type: DeivceById })
    getLogByDeviceLast(@Query() query) {
      
        return this.mqtttService.deleteDeviceOwon({...query})
    }
}



