import { Injectable ,Inject } from '@nestjs/common';
import { tap,map } from 'rxjs';
import { Cron ,CronExpression} from '@nestjs/schedule';
import { lineService } from 'src/line/line.service';
import { lineNotifyQuery } from 'src/line/dto/line.dto';
import { LogService } from 'src/log/log.service';
import { DeviceService } from 'src/device/device.service';
import { GetLogByDeviceDto } from 'src/log/dto/log.dto';
import {
    ClientProxy,
    MessagePattern,
    Payload,
    Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs'
import { GatewayService } from 'src/gateway/gateway.service';
import { DeviceOwonService } from 'src/deviceowon/deviceowon.service';
import { RCFSiteService } from 'src/RCFSite/rcfsite.service';
import { LogOwonService } from 'src/logowon/logowon.service';
import { GetLogOwonByDeviceCommandDto } from 'src/logowon/dto/logowon.dto';
import { LogOwonRCFService } from 'src/logOwonRCF/logowonrcf.service';
import { CreateDeviceOwonOrUpdateDto } from 'src/deviceowon/dto/deviceowon.dto';
@Injectable()
export class CronjobsService {
    constructor(
        private readonly lineservice : lineService,
        private readonly logService: LogService,
        private readonly logOwonService: LogOwonService,
        private readonly logOwonRCFService: LogOwonRCFService,
        private readonly gatewayService: GatewayService,
        private readonly deviceOwonService: DeviceOwonService,
        private readonly rcfSiteService: RCFSiteService,
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
        private readonly deviceService : DeviceService
      ) {}

    // @Cron( CronExpression.EVERY_10_MINUTES )
    // async openForBusiness()  {
    //     let time_now = new Date()
    //     let logQuery :GetLogByDeviceDto={
    //             take:1,
    //             skip:0,
    //             deviceId:"eb2b77dbde06edc8ceb402",
    //     }
    //     // await this.logService.getLogByDevice(logQuery)
    //     let result = await  this.logService.getLogByDevice({ take: logQuery.take, 
    //     skip: logQuery.skip, 
    //     deviceId: logQuery.deviceId });

        
        
    //     let query:lineNotifyQuery ={
    //         message:"send time"+time_now.toLocaleString(),
    //     };

    //     // console.log("result...")
    //     (await this.lineservice.sendLineNotify(query)).subscribe(response => console.log(response));
    //     // console.log("Delicious cakes is open for business...")
    //     console.log("result...",result.log_devices)
        
    // }

    

    @Cron(CronExpression.EVERY_MINUTE)
    async checkDevice(){
        
        let s:any = 
        {
            "type":"zigbeeConfig",
            "command":"epList",
            "session":"1peem39po1ilnk9",
            "sequence":55260
        }
        let gateways = await this.gatewayService.getAllGateWay();
        gateways.map((gateway)=>{
           let {id} =  gateway
           firstValueFrom(this.client.send(`api/device/`+id+`/deviceList`, s))
        })
    }
    async tempHumi(id:string){
        let log_temp = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"temp"
        })
        let log_humi = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"humi"
        })
        var {logreport} = log_temp.log_devices as any
        let log_t = logreport[0]
        var {logreport} = log_humi.log_devices as any
        let log_h = logreport[0]
        let deviceOwon = log_temp.log_devices as any
        delete deviceOwon.logreport as any
        return {device:deviceOwon,temp:log_t,humi:log_h}
    }
    async linePower(id:string){
        let log_line1 = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"L1/AData"
        })
        let log_line2 = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"L2/BData"
        })
        let log_line3 = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"L3/CData"
        })
        let log_main = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"mainData"
        })
        var {logreport} = log_main.log_devices as any
        let log_m = logreport[0]
        var {logreport} = log_line1.log_devices as any
        let log_l1 = logreport[0]
        var {logreport} = log_line2.log_devices as any
        let log_l2 = logreport[0]
        var {logreport} = log_line3.log_devices as any
        let log_l3 = logreport[0]
        let deviceOwon = log_main.log_devices as any
        delete deviceOwon.logreport as any
        return{
            device:deviceOwon,
            mainData:log_m,
            L1:log_l1,
            L2:log_l2,
            L3:log_l3,
        }
    }

    async doorSensor(id:string){
        
        let log_door = await this.logOwonService.getLogLastByIdAndCommand({
            deviceId:id,
            take:1,
            skip:0,
            command:"sensor"
        })
        var {logreport} = log_door.log_devices as any
        let log_d = logreport[0]
        let deviceOwon = log_door.log_devices as any
        return {device:deviceOwon,door:log_d}
    }
    // @Cron(CronExpression.EVERY_MINUTE)
    // async deviceStatus(){

    // }
    @Cron(CronExpression.EVERY_MINUTE)
    async powerGetEnergyInfo(){
        
        let list_device = await this.deviceOwonService.getAllDeviceBydeviceType(49165)
        list_device.map(async (device)=>{
            let {ieee,gateway_ieee} = device
            let s:any = 
            {
                "type":"3PhaseEnergy",
                "command":"get3PhaseEnergyInfo",
                "session":"81wmohrs7s4ix22",
                "sequence":1017,
                "argument":
                    {
                    "ieee":ieee,
                    "ep":1,
                    "cache": 0
                    }
            }
            // console.log("s",s)
            firstValueFrom(this.client.send(`api/device/`+gateway_ieee+`/power`, s))
            setTimeout(() => console.log(``), 1000)
        })
    }
    
    // @Cron(CronExpression.EVERY_MINUTE)
    async rcfLogUpdate2(){
        const TIME_OFFLINE_S = 60*15;
        let listRcf = await this.rcfSiteService.getAllRCFLine()
        listRcf.map(async (rcf)=>{
            try{

                let {powerats_device,powermain_device,temp_device,line} = rcf;
                let log_main = await this.linePower(powermain_device.id)
                let log_ats = await this.linePower(powerats_device.id)
                let log_temp = await this.tempHumi(temp_device.id)
    
                let power_status = "main"
                let online_main = false
                let time_main =new Date(log_main.mainData.createdAt)
                let time_mainString = log_main.mainData.createdAt
                if(time_main < new Date(log_main.L1.createdAt)){
                    time_main = new Date(log_main.L1.createdAt)
                    time_mainString = log_main.L1.createdAt
                    if(time_main < new Date(log_main.L2.createdAt)){
                        time_main = new Date(log_main.L2.createdAt)
                        time_mainString = log_main.L2.createdAt
                        if(time_main < new Date(log_main.L3.createdAt)){
                            time_main = new Date(log_main.L3.createdAt)
                            time_mainString = log_main.L3.createdAt
                            
                        }
                    }
                }
                let time_compaMain = (new Date().valueOf() - time_main.valueOf()) / 1000;
                
                if(time_compaMain > (TIME_OFFLINE_S)){
                    online_main =false
                }else{
                    online_main =true
                    power_status="main"
                }
                let online_ats = false
                let time_ats =new Date(log_ats.mainData.createdAt)
                let time_atsString = log_ats.mainData.createdAt
    
                if(time_ats < new Date(log_ats.L1.createdAt)){
                    time_ats = new Date(log_ats.L1.createdAt)
                    time_atsString = log_ats.L1.createdAt
                    if(time_ats < new Date(log_ats.L2.createdAt)){
                        time_ats = new Date(log_ats.L2.createdAt)
                        time_atsString = log_ats.L2.createdAt
                        if(time_ats < new Date(log_ats.L3.createdAt)){
                            time_ats = new Date(log_ats.L3.createdAt)
                            time_atsString = log_ats.L3.createdAt
                            
                        }
                    }
                }
                let time_compaAts = (new Date().valueOf() - time_ats.valueOf()) / 1000;
                
                if(time_compaAts > (TIME_OFFLINE_S)){
                    online_ats =false
                }else{
                    online_ats =true
                    power_status="gen"
                }
                let online_temp = false
                let time_temp =new Date(log_temp.temp.createdAt)
                let time_tempString = log_temp.temp.createdAt
                if(time_temp < new Date(log_temp.humi.createdAt)){
                    time_temp = new Date(log_temp.humi.createdAt)
                    time_tempString = log_temp.humi.createdAt
                }
    
                let time_compaTemp = (new Date().valueOf() - time_temp.valueOf()) / 1000;
                
                if(time_compaTemp > (TIME_OFFLINE_S)){
                    online_temp =false
                }else{
                    online_temp =true
                }
                if(online_main == true && online_ats == true){
                    power_status="main"
                }
                if(online_main == false && online_ats == false){
                    power_status="lose"
                }
                let current_ats = Number(log_ats.L1.jsonData.current)+ Number(log_ats.L2.jsonData.current)+ Number(log_ats.L3.jsonData.current)
                let valueView={
                    mainVoltage:log_main.L1.jsonData.voltage,
                    mainCurrent:log_main.L1.jsonData.current,
                    atsVoltage:log_ats.L1.jsonData.voltage,
                    atsCurrent:current_ats,
                    humi:log_temp.temp.jsonData.humi,
                    temp:log_temp.temp.jsonData.temp,
                }
                let powerStatus={
                    power_status:power_status,
                    online_main:online_main,
                    online_ats:online_ats,
                    online_temp:online_temp,
                    time_main:time_mainString,
                    time_ats:time_atsString,
                    time_temp:time_tempString,
                    valueView:valueView
                }
                let result = await this.logOwonRCFService.create({
                    id:"",
                    powerStatus:JSON.parse(JSON.stringify(powerStatus)),
                    rcfId:rcf.id,
                    powerMain_Data:JSON.parse(JSON.stringify(log_main)),
                    powerATS_Data:JSON.parse(JSON.stringify(log_ats)),
                    temp_Data:JSON.parse(JSON.stringify(log_temp))
                })
                let logRCF = await this.logOwonRCFService.getRcfSiteByID({ 
                    take: 2,
                     skip: 0, 
                     rcfId: rcf.id})
                // console.log("rcfLogUpdate",log_main.mainData)
                let {log_devices} = logRCF
                if(log_devices != null){
                    let {log_rcf} = log_devices
                    if(log_rcf.length > 1){
                        let log_before = log_rcf[1]
                        let log_now = log_rcf[0]
                        let status_now = log_now.powerStatus as any;
                        let status_before = log_before.powerStatus as any;
                        let tempData_now = log_now.temp_Data
                        let tempData_before = log_before.temp_Data
                        let checkTemp_now = await this.tempLimitedCheck(tempData_now)
                        let checkTemp_before  = await this.tempLimitedCheck(tempData_before )
                        if(line != null){
                            let url_rcf = await this.rcfGenerateRCFURL(rcf.id)
                            line.map(async (lineIn:any)=>{

                                if(checkTemp_now === true && checkTemp_before === false ){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Temperature Change - Temp Over 27 °C 🌡️"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                }

                                if(status_now.power_status as any === "lose" && status_before.power_status !=="lose"){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Lose 🔌🔴"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }else if(status_now.power_status as any === "gen" && status_before.power_status !=="gen"){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Gen 🔋"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }else if(status_now.power_status as any === "main" && status_before.power_status !=="main"){
                                    
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Main ⚡"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }
                                
                            })
                        }
                    }
                }
            }catch(error){

            }
        })
    }
    @Cron(CronExpression.EVERY_MINUTE)
    async rcfLogUpdate2Door(){
        const TIME_OFFLINE_S = 60*15;
        let listRcf = await this.rcfSiteService.getAllRCFLine()
        listRcf.map(async (rcf)=>{
            try{

                let {powerats_device,powermain_device,temp_device,line,door_device} = rcf;
                let log_main = await this.linePower(powermain_device.id)
                let log_ats = await this.linePower(powerats_device.id)
                let log_temp = await this.tempHumi(temp_device.id)
                let log_door = await this.doorSensor(door_device.id)

                let power_status = "main"
                let online_main = false
                let time_main =new Date(log_main.mainData.createdAt)
                let time_mainString = log_main.mainData.createdAt
                if(time_main < new Date(log_main.L1.createdAt)){
                    time_main = new Date(log_main.L1.createdAt)
                    time_mainString = log_main.L1.createdAt
                    if(time_main < new Date(log_main.L2.createdAt)){
                        time_main = new Date(log_main.L2.createdAt)
                        time_mainString = log_main.L2.createdAt
                        if(time_main < new Date(log_main.L3.createdAt)){
                            time_main = new Date(log_main.L3.createdAt)
                            time_mainString = log_main.L3.createdAt
                            
                        }
                    }
                }
                let time_compaMain = (new Date().valueOf() - time_main.valueOf()) / 1000;
                
                if(time_compaMain > (TIME_OFFLINE_S)){
                    online_main =false
                }else{
                    online_main =true
                    power_status="main"
                }
                let online_ats = false
                let time_ats =new Date(log_ats.mainData.createdAt)
                let time_atsString = log_ats.mainData.createdAt
    
                if(time_ats < new Date(log_ats.L1.createdAt)){
                    time_ats = new Date(log_ats.L1.createdAt)
                    time_atsString = log_ats.L1.createdAt
                    if(time_ats < new Date(log_ats.L2.createdAt)){
                        time_ats = new Date(log_ats.L2.createdAt)
                        time_atsString = log_ats.L2.createdAt
                        if(time_ats < new Date(log_ats.L3.createdAt)){
                            time_ats = new Date(log_ats.L3.createdAt)
                            time_atsString = log_ats.L3.createdAt
                            
                        }
                    }
                }
                let time_compaAts = (new Date().valueOf() - time_ats.valueOf()) / 1000;
                
                if(time_compaAts > (TIME_OFFLINE_S)){
                    online_ats =false
                }else{
                    online_ats =true
                    power_status="gen"
                }
                let online_temp = false
                let time_temp =new Date(log_temp.temp.createdAt)
                let time_tempString = log_temp.temp.createdAt
                if(time_temp < new Date(log_temp.humi.createdAt)){
                    time_temp = new Date(log_temp.humi.createdAt)
                    time_tempString = log_temp.humi.createdAt
                }
    
                let time_compaTemp = (new Date().valueOf() - time_temp.valueOf()) / 1000;
                
                if(time_compaTemp > (TIME_OFFLINE_S)){
                    online_temp =false
                }else{
                    online_temp =true
                }
                if(online_main == true && online_ats == true){
                    power_status="main"
                }
                if(online_main == false && online_ats == false){
                    power_status="lose"
                }
                let current_ats = Number(log_ats.L1.jsonData.current)+ Number(log_ats.L2.jsonData.current)+ Number(log_ats.L3.jsonData.current)
                let valueView={
                    mainVoltage:log_main.L1.jsonData.voltage,
                    mainCurrent:log_main.L1.jsonData.current,
                    atsVoltage:log_ats.L1.jsonData.voltage,
                    atsCurrent:current_ats,
                    humi:log_temp.temp.jsonData.humi,
                    temp:log_temp.temp.jsonData.temp,
                    door:log_door.door.jsonData.status === 49 ?true:false,
                }
                let powerStatus={
                    power_status:power_status,
                    online_main:online_main,
                    online_ats:online_ats,
                    online_temp:online_temp,
                    online_door:log_door.device.linkStatus,
                    time_main:time_mainString,
                    time_ats:time_atsString,
                    time_temp:time_tempString,
                    valueView:valueView
                }
                let result = await this.logOwonRCFService.create({
                    id:"",
                    powerStatus:JSON.parse(JSON.stringify(powerStatus)),
                    rcfId:rcf.id,
                    powerMain_Data:JSON.parse(JSON.stringify(log_main)),
                    powerATS_Data:JSON.parse(JSON.stringify(log_ats)),
                    temp_Data:JSON.parse(JSON.stringify(log_temp))
                })
                let logRCF = await this.logOwonRCFService.getRcfSiteByID({ 
                    take: 2,
                     skip: 0, 
                     rcfId: rcf.id})
                // console.log("rcfLogUpdate",log_main.mainData)
                let {log_devices} = logRCF
                if(log_devices != null){
                    let {log_rcf} = log_devices
                    if(log_rcf.length > 1){
                        let log_before = log_rcf[1]
                        let log_now = log_rcf[0]
                        let status_now = log_now.powerStatus as any;
                        let status_before = log_before.powerStatus as any;
                        let tempData_now = log_now.temp_Data
                        let tempData_before = log_before.temp_Data
                        let checkTemp_now = await this.tempLimitedCheck(tempData_now)
                        let checkTemp_before  = await this.tempLimitedCheck(tempData_before )
                        if(line != null){
                            let url_rcf = await this.rcfGenerateRCFURL(rcf.id)
                            line.map(async (lineIn:any)=>{

                                if(checkTemp_now === true && checkTemp_before === false ){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Temperature Change - Temp Over 27 °C 🌡️"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                }

                                if(status_now.power_status as any === "lose" && status_before.power_status !=="lose"){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Lose 🔌🔴"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }else if(status_now.power_status as any === "gen" && status_before.power_status !=="gen"){
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Gen 🔋"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }else if(status_now.power_status as any === "main" && status_before.power_status !=="main"){
                                    
                                    (await this.lineservice.sendLineNotifyToken({
                                        message:"RCF : "+log_devices.name + " Status Change - Power Main ⚡"+
                                        "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                    })).subscribe(response => console.log(response));
                                    
                                }
                                
                            })
                        }
                    }
                }
            }catch(error){

            }
        })
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async rcfLineStatusUpdate(){
        let listRcf = await this.rcfSiteService.getAllRCFLine()
        listRcf.map(async (rcf)=>{
            let {line} = rcf
            let logRCF = await this.logOwonRCFService.getRcfSiteByID({ 
                take: 1,
                 skip: 0, 
                 rcfId: rcf.id})
            // console.log("rcfLogUpdate",log_main.mainData)
            let {log_devices} = logRCF
            if(log_devices != null){
                let {Site} = log_devices
                let {log_rcf} = log_devices
                if(log_rcf.length > 0){
                    let log_now = log_rcf[0]
                    let status_now = log_now.powerStatus as any;
                    let tempData_now = log_now.temp_Data
                    
                    let checkTemp_now = await this.tempLimitedCheck(tempData_now)
                    if(line != null){
                        let url_rcf = await this.rcfGenerateRCFURL(rcf.id)
                        line.map(async (lineIn:any)=>{
                            
                            if(checkTemp_now === true  ){
                                let tempInt:Number = Number((tempData_now as any).temp.jsonData.temp) / 100;
                                (await this.lineservice.sendLineNotifyToken({
                                    message:"Site 🏕️ : "+Site.site + " - Desc : "+Site.description + "\n"+
                                    "RCF : "+log_devices.name + " - Temperature "+tempInt+" °C 🌡️ "+
                                    "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                })).subscribe(response => console.log(response));
                            }
                            if(status_now.power_status as any === "lose" ){
                                (await this.lineservice.sendLineNotifyToken({
                                    message:"Site 🏕️ : "+Site.site + " - Desc : "+Site.description + "\n"+"RCF : "+log_devices.name + " - Power Lose 🔌🔴"+
                                    "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                })).subscribe(response => console.log(response));
    
                            }else if(status_now.power_status as any === "gen"){
                                (await this.lineservice.sendLineNotifyToken({
                                    message:"Site 🏕️ : "+Site.site + " - Desc : "+Site.description + "\n"+"RCF : "+log_devices.name + " - Power Gen 🔋"+
                                    "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                })).subscribe(response => console.log(response));
        
                            }else if(status_now.power_status as any === "main" ){
                                // (await this.lineservice.sendLineNotifyToken({
                                //     message:"Site 🏕️ : "+Site.site + " - Desc : "+Site.description + "\n"+"RCF : "+log_devices.name + " - Power Main ⚡"+
                                //     "\n"+"RCF 🌐 "+url_rcf,token:lineIn.lineToken,
                                // })).subscribe(response => console.log(response));
        
                            }
                            
    
                        })
                    }
                }
            }
        })
    }

    async rcfGenerateRCFURL(rcf_id:string){
        return process.env.url_ui+"lineRCF?rcfDeivce="+rcf_id;
    }

    async tempLimitedCheck(tempData:any){
        const TEMP_LEMIT:number = 27
        let {temp} = tempData
        let tempInt:number = Number(temp.jsonData.temp) / 100
        if(tempInt >= TEMP_LEMIT){
            return true
        }else{
            return false
        }
    }
}