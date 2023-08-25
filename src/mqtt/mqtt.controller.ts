import { Controller, Get, Inject } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { LogService } from '../log/log.service';
import { ProductService } from '../product/product.service'
import {
    ClientProxy,
    Ctx,
    MessagePattern,
    MqttContext,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'


@Controller()
export class MqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly deviceService: DeviceService,
        private readonly productService: ProductService,
        private readonly logService: LogService
    ) { }


    // @MessagePattern('mqtt', Transport.MQTT)
    // getNotifications(@Payload() data) {
    //     return firstValueFrom(this.client.send('mqtt/message', 'message : ' + Math.random()))
    // }
    @MessagePattern('site/+/sid', Transport.MQTT)
    all(@Payload() data, @Ctx() context: MqttContext) {
        console.log(`${context.getTopic()}`, data)
    }

    @MessagePattern('site/+/sensor/#', Transport.MQTT)
    async getSensor(@Payload() data, @Ctx() context: MqttContext) {
        let topic = context.getTopic().split('/')
        // console.log(topic)
        let device = null
        let save = null
        switch (topic[4]) {
            case "name":
                device = {
                    id: topic[3],
                    name: data as string
                }
                save = await this.deviceService.createOrUpdate(device)
                break
            case "status_action":
                // device = {
                //     id: topic[3],
                //     name: data as string
                // }
                // console.log(Object.keys(data))
                save = await this.logService.create({
                    deviceId: topic[3],
                    dp_id: Object.keys(data),
                    value: Object.values(data)
                })
                console.log(save)
                break
            case "detail":
                const product = await this.productService.createOrUpdate({
                    product_id: data.product_id as string,
                    product_name: data.product_name as string

                })
                device = {
                    id: topic[3],
                    local_key: data.local_key as string,
                    ip: data.ip as string,
                    productId: product.product_id,
                    // product_name: data.product_name as string,
                    model: data.model as string
                }

                save = await this.deviceService.createOrUpdate(device)


                break
        }

        // console.log(`${context.getTopic()}`, data)
    }
}



