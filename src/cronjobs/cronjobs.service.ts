import { Injectable  } from '@nestjs/common';
import { tap,map } from 'rxjs';
import { Cron ,CronExpression} from '@nestjs/schedule';
import { lineService } from 'src/line/line.service';
import { lineNotifyQuery } from 'src/line/dto/line.dto';
import { LogService } from 'src/log/log.service';
import { DeviceService } from 'src/device/device.service';
import { GetLogByDeviceDto } from 'src/log/dto/log.dto';
@Injectable()
export class CronjobsService {
    constructor(
        private readonly lineservice : lineService,
        private readonly logService: LogService,
        private readonly deviceService : DeviceService
      ) {}

    @Cron( CronExpression.EVERY_10_MINUTES )
    async openForBusiness()  {
        let time_now = new Date()
        let logQuery :GetLogByDeviceDto={
                take:1,
                skip:0,
                deviceId:"eb2b77dbde06edc8ceb402",
        }
        // await this.logService.getLogByDevice(logQuery)
        let result = await  this.logService.getLogByDevice({ take: logQuery.take, 
        skip: logQuery.skip, 
        deviceId: logQuery.deviceId });

        
        
        let query:lineNotifyQuery ={
            message:"send time"+time_now.toLocaleString(),
        };

        // console.log("result...")
        (await this.lineservice.sendLineNotify(query)).subscribe(response => console.log(response));
        // console.log("Delicious cakes is open for business...")
        console.log("result...",result.log_devices)
        
    }

    @Cron( CronExpression.EVERY_10_MINUTES )
    async checkOnlineDevice(){
        const list_device = await this.deviceService.getAllDevice();
        const time_now = new Date()
        list_device.map(async (device)=> {
            // console.log(device)
            let {id} = device
            let logQuery :GetLogByDeviceDto={
                    take:1,
                    skip:0,
                    deviceId:id,
            }
            let {log_devices} = await this.logService.getLogByDeviceLast(logQuery);
            console.log(log_devices)
            let {createdAt} = log_devices[0]
            let time_create = new Date(createdAt)
            let time_compaSecond = (time_now.valueOf() - time_create.valueOf()) / 1000;  //second
            let time_compaMinute = (time_now.valueOf() - time_create.valueOf()) / (1000*60);  //Minute
            let time_compaHour = (time_now.valueOf() - time_create.valueOf()) / (1000*60 * 60);  //Hour
            if(time_compaMinute > 10){
                (await this.lineservice.sendLineNotify({
                    message:"Device : "+device.name + " - Offline",
                })).subscribe(response => console.log(response));
            }else{
                (await this.lineservice.sendLineNotify({
                    message:"Device : "+device.name + " - Online",
                })).subscribe(response => console.log(response));
            }
        })
    }
}