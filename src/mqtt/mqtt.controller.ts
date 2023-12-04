import { Controller, Get, Inject } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { LogService } from '../log/log.service';
import { ProductService } from '../product/product.service'
import { SiteService } from '../site/site.service';
import { DeviceOwonService } from 'src/deviceowon/deviceowon.service';
import {
    ClientProxy,
    Ctx,
    MessagePattern,
    MqttContext,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { isJSON, isObject } from 'class-validator';
import { CreateLogOwonDto } from 'src/logowon/dto/logowon.dto';
import { LogOwonService } from 'src/logowon/logowon.service';

@Controller()
export class MqttController {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly deviceService: DeviceService,
        private readonly deviceOwonService: DeviceOwonService,
        private readonly productService: ProductService,
        private readonly logService: LogService,
        private readonly logOwonService: LogOwonService,
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
        console.log("data")
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
            case "sensor_type":
                device = {
                    id: topic[1],
                    sensor_type: data as string
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

                if (data) {
                    save = await this.logService.create({
                        deviceId: topic[1],
                        dp_id: Object.keys(data),
                        value: Object.values(data)
                    })
                }
                // console.log("status_action " + save)
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


    
    @MessagePattern('reply/device/#',Transport.MQTT)
    async getMessageOWON(@Payload() data, @Ctx() context: MqttContext) {
        let topic = context.getTopic().split('/')
        console.log("data")
        console.log(data)
        console.log("topic")
        console.log(topic)
        let device = null
        let save = null
        let result = null
        let logData = null
        switch(topic[3]){
            case "deviceList":
                let {response} = data;
                let {epList} = response;
                // console.log("epList")
                // console.log(epList)
                epList.map(async (ep)=>{

                    device = {...ep,gateway_ieee:topic[2] as string}
                    console.log(device)
                     save = await this.deviceOwonService.createOrUpdate(device)
                })
                break;
            case "setName":
                result = data.result;
                if(result === true){
                    
                    let s:any = 
                    {
                        "type":"zigbeeConfig",
                        "command":"epList",
                        "session":"1peem39po1ilnk9",
                        "sequence":77772
                    }
                    firstValueFrom(this.client.send(`api/device/`+topic[2] as string+`/deviceList`, s))
                }
                break;
            case "power":
                    result = data.result;
                    if(result === true){
                        let {ieee,ep,response} =data
                        let {main} =response
                        console.log("L1/A",response['L1/A'])
                        let log_main = await this.setPowerFormatingMain(ieee,ep,main)
                        let log_L1 = await this.setPowerFormatingLine(ieee,ep,
                            response['L1/A'],"L1/AData")
                        let log_L2 = await this.setPowerFormatingLine(ieee,ep,
                            response['L2/B'],"L2/BData")
                        let log_L3 = await this.setPowerFormatingLine(ieee,ep,
                            response['L3/C'],"L3/CData")
                            
                        save = await this.logOwonService.create(log_main as any);
                        save = await this.logOwonService.create(log_L1 as any);
                        save = await this.logOwonService.create(log_L2 as any);
                        save = await this.logOwonService.create(log_L3 as any);
                    }
                break;
            // case "action":
            //     result = data.result;
            //     if(result === true){
                    
            //         console.log(data)
            //         let {description,response,ieee} = data
            //         logData = {
            //             deviceId : ieee as string,
            //             type:null,
            //             command:null,
            //             message:response,
            //             description:description as string
            //         }
            //         console.log(logData)
            //         save = await this.logOwonService.create(logData);
                    
            //     }
            //     break;
        }
    }
    async setPowerFormatingMain(ieee:string,ep:string,message:any){
        let argument={
        "ep":ep,
        "sum":message.sum,
        "ieee":ieee,
        "unit":message.unit,
        "demand":message.demand,
        "current":message.current,
        "divisor":message.divisor,
        "mutiplier":message.mutiplier,
        "meterStatus":message.meterStatus,
        "powerFactor":0,
        "reactiveSum":message.reactiveSum,
        "sumFormatting":message.sumFormatting,
        "reactiveDemand":message.reactiveDemand,
        "demandFormatting":message.demandFormatting
        }
        let log_main = {
            deviceId : ieee+""+ep,
            type:"update",
            command:"mainData",
            message:argument,
            description:null
        }
        return log_main
    }
    async setPowerFormatingLine(ieee:string,ep:string,message:any,command:string){
        let argument={
        "ep":ep,
        "sum":message.sum,
        "ieee":ieee,
        "demand":message.demand,
        "current":message.current,
        "voltage":message.voltage,
        "powerFactor":0,
        "reactiveSum":message.reactiveSum,
        "reactiveDemand":message.reactiveDemand
        }
        let log = {
            deviceId : ieee+""+ep,
            type:"update",
            command:command,
            message:argument,
            description:null
        }
        return log
    }
    @MessagePattern('device/+/#',Transport.MQTT)
    async deviceReport(@Payload() data, @Ctx() context: MqttContext) {
        let topic = context.getTopic().split('/')
        // console.log(topic, data)
        //topic1 = site id
        let log = null
        let save = null
        switch (topic[2]) {
            case "report":
                // console.log("report")
                // console.log(data)
                let {argument,type,command} = data
                log = {
                    deviceId : argument.ieee+""+argument.ep,
                    type:type,
                    command:command,
                    message:argument,
                    description:null
                }
                
                console.log("report log",log)
                save = await this.logOwonService.create(log);
                break

        }
    }
}



