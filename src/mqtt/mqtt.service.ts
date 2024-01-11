import { Injectable ,Inject} from '@nestjs/common';
import {
    ClientProxy,
    MessagePattern,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { DeviceOwonService } from 'src/deviceowon/deviceowon.service';
import { DeivceById } from 'src/deviceowon/dto/deviceowon.dto';
@Injectable()
export class MqttService {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly deviceowonservice: DeviceOwonService,
    ) { }
    async deleteDeviceOwon(query :DeivceById){
        let device = await this.deviceowonservice.getDeviceByID({...query})
        // var delete = await this.deviceowonservice.deleteDeviceOwon({...query})
        let s:any = 
        {
            "type":"zigbeeConfig",
            "command":"delete",
            "session":"bncldtfzp5gzoxv",
            "sequence":1011,
            "argument":
                {
                "ieee":device.ieee as string,
                "ep":1
                }
            }
        firstValueFrom(this.client.send(`api/device/`+device.gateway_ieee as string+`/delete`, s))
        let deleteDevice = await this.deviceowonservice.deleteDeviceOwon({...query});
        return deleteDevice
    }
}
