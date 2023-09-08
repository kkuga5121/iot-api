import { Controller, Get, Inject } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { LogService } from '../log/log.service';
import { ProductService } from '../product/product.service'
import { SiteService } from '../site/site.service';
import {
    ClientProxy,
    Ctx,
    MessagePattern,
    MqttContext,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { isJSON } from 'class-validator';


@Controller()
export class MqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly deviceService: DeviceService,
        private readonly productService: ProductService,
        private readonly logService: LogService,
        private readonly siteService: SiteService
    ) { }


    // @MessagePattern('mqtt', Transport.MQTT)
    // getNotifications(@Payload() data) {
    //     return firstValueFrom(this.client.send('mqtt/message', 'message : ' + Math.random()))
    // }
    @MessagePattern('site/+/#', Transport.MQTT)
    all(@Payload() data, @Ctx() context: MqttContext) {
        let topic = context.getTopic().split('/')
        // console.log(topic, data)
        //topic1 = site id
        switch (topic[2]) {
            case "site_name":
                let site_name = this.siteService.createOrUpdate({
                    id: topic[1],
                    site: data,
                })
                break
            case "site_descriptor":
                let site_desc = this.siteService.createOrUpdate({
                    id: topic[1],
                    description: data
                })
                break

        }
    }

    @MessagePattern('sensor/#', Transport.MQTT)
    async getSensor(@Payload() data, @Ctx() context: MqttContext) {
        let topic = context.getTopic().split('/')
        console.log(data)
        //topic1 = device id
        let device = null
        let save = null
        switch (topic[2]) {
            case "name":
                device = {
                    id: topic[1],
                    name: data as string
                }
                save = await this.deviceService.createOrUpdate(device)
                break
            case "sid":
                device = {
                    id: topic[1],
                    siteId: String(data) as string
                }
                save = await this.deviceService.createOrUpdate(device)
                break
            case "status_action":
                // device = {
                //     id: topic[3],
                //     name: data as string
                // }
                // console.log(Object.keys(data))
                if (isJSON(data)) {
                    save = await this.logService.create({
                        deviceId: topic[1],
                        dp_id: Object.keys(data),
                        value: Object.values(data)
                    })
                }
                // console.log(save)
                break
            case "detail":

                const product = await this.productService.createOrUpdate({
                    product_id: data.product_id as string,
                    product_name: data.product_name as string

                })
                device = {
                    id: topic[1],
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



