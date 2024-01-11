import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogOwonDto,GetLogOwonDto ,GetLogOwonByDeviceCommandDto,GetLogOwonByDeviceDto,GetLogOwonByDeviceDateDto} from './dto/logowon.dto';
import { connect } from 'http2';

@Injectable()
export class LogOwonService{
    constructor(
        private readonly prismaService: PrismaService,
    ){}
    
    async create(data: CreateLogOwonDto) {
        let {id ,deviceId,description,type,command,message} =data;
        const createLogDevice = await this.prismaService.logOwonReport.create({
            data: {
                deviceId: deviceId,
                description: description,
                type:type,
                command:command,
                jsonData:message,
            }
        });
        // console.log("createLogDevice " + createLogDevice)
        return {  createLogDevice }
    }

    async get(query: GetLogOwonDto) {
        const log = await this.prismaService.logOwonReport.findMany({
            skip: query.skip,
            take: query.take,
            include: {
                devicesOwon:
                {
                    include:
                    {
                        Site: true
                    }
                }
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_devices: log }
    }
    async getLogLastById(query:GetLogOwonByDeviceDto){

        try{
            const device = await this.prismaService.deviceOWON.findUnique({
                where: { id: query.deviceId },
                include: {
                    logreport: {
                        skip: query.skip,
                        take: query.take,
                        orderBy: {
                            createdAt: 'desc'
                        },
                    }
                }
            })
            return { log_devices: device }
        }catch(error){

            return { log_devices:[] }
        }
    }
    
    async getLogLastByIdAndCommand(query:GetLogOwonByDeviceCommandDto){

        try{
            const device = await this.prismaService.deviceOWON.findUnique({
                where: { id: query.deviceId },
                include: {
                    logreport: {
                        skip: query.skip,
                        take: query.take,
                        where:{
                            command:query.command
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                    }
                }
            })
            return { log_devices: device }
        }catch(error){

            return { log_devices:[] }
        }
    }

    async getDataByTimeCustomDataLenght(query: GetLogOwonByDeviceDateDto){

        let time_start = new Date(query.timeStart)
        // time_start.setHours(0,0,0,1)
        let time_end = new Date(query.timeEnd)
        // time_end.setHours(23,59,59,999)
        if(time_start === time_end){
            time_start.setHours(0,0,0,1)
            time_end.setHours(23,59,59,999)
        }
        var list_timeStart = [];
        var list_timeEnd = [];
        console.log("getDataPerHourByTimeSelect EndTime",time_end.toString())
        console.log("getDataPerHourByTimeSelect Starttime",time_start.toString())

        let time_compaSecond = (time_end.valueOf() - time_start.valueOf()) / 1000;  //second
        let time_compaMinute = (time_end.valueOf() - time_start.valueOf()) / (1000*60);  //Minute
        let time_compaHour = (time_end.valueOf() - time_start.valueOf()) / (1000*60 * 60);  //Hour
        time_compaMinute =time_compaMinute /  20
        
        const list_log = []
        
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + time_compaMinute)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeStart.splice(list_timeStart.length -1,1)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logOwonReport.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                orderBy: [
                    {
                        id: 'desc'
                    }
                ]
            })
            
            list_log.push(log_number)
            i = i+1
        }

        // list_timeStart.rem
        // list_timeEnd.push(time_end)
        
        return { log_time:list_timeStart,log_devices:list_log}
        // return { list_timeStart:list_timeStart,list_timeEnd:list_timeEnd}
    }

    
    async getDataByTimeCustomDataLenghtAndCommand(query: GetLogOwonByDeviceDateDto){

        let time_start = new Date(query.timeStart)
        // time_start.setHours(0,0,0,1)
        let time_end = new Date(query.timeEnd)
        // time_end.setHours(23,59,59,999)
        if(time_start === time_end){
            time_start.setHours(0,0,0,1)
            time_end.setHours(23,59,59,999)
        }
        var list_timeStart = [];
        var list_timeEnd = [];
        console.log("getDataPerHourByTimeSelect EndTime",time_end.toString())
        console.log("getDataPerHourByTimeSelect Starttime",time_start.toString())

        let time_compaSecond = (time_end.valueOf() - time_start.valueOf()) / 1000;  //second
        let time_compaMinute = (time_end.valueOf() - time_start.valueOf()) / (1000*60);  //Minute
        let time_compaHour = (time_end.valueOf() - time_start.valueOf()) / (1000*60 * 60);  //Hour
        time_compaMinute =time_compaMinute /  50
        
        const list_log = []
        
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + time_compaMinute)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeStart.splice(list_timeStart.length -1,1)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logOwonReport.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },command:query.command,
                    deviceId: query.deviceId
                },
                orderBy: [
                    {
                        id: 'desc'
                    }
                ]
            })
            
            list_log.push(log_number)
            i = i+1
        }

        // list_timeStart.rem
        // list_timeEnd.push(time_end)
        
        return { log_time:list_timeStart,log_devices:list_log}
        // return { list_timeStart:list_timeStart,list_timeEnd:list_timeEnd}
    }
}
