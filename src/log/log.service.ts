import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto, GetLogByDeviceDto ,GetLogByDeviceDateDto} from './dto/log.dto';
import { GetLogDto } from './dto/log.dto';
@Injectable()
export class LogService {

    constructor(

        private readonly prismaService: PrismaService

    ) { }
    async create(data: CreateLogDto) {
        let { deviceId, dp_id, value } = data
        let logPropertuies = []
        try {
            const createLogDevice = await this.prismaService.logDevice.create({
                data: {
                    deviceId: deviceId
                }
            });
            console.log("createLogDevice " + createLogDevice)
            for (let i = 0; i < dp_id.length; i++) {
                logPropertuies.push({
                    dp_id: dp_id[i],
                    value: String(value[i]),
                    logDeviceId: createLogDevice.id
                })
            }
            const createLog = await this.prismaService.logProperty.createMany({
                data: logPropertuies
            });

            // return createLogDevice;
            return { createLog, createLogDevice }
        } catch (error) {
            throw new error
        }
    }

    async get(query: GetLogDto) {
        const log = await this.prismaService.logDevice.findMany({
            skip: query.skip,
            take: query.take,
            include: {
                Device:
                {
                    include:
                    {
                        Product: { include: { product_properties: true } },
                        Site: true
                    }
                },
                logProperty: true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_devices: log }
    }

    async getLogByDevice(query: GetLogByDeviceDto) {

        const device = await this.prismaService.device.findUnique({
            where: { id: query.deviceId },

            include: {
                log_devices: {
                    skip: query.skip,
                    take: query.take,

                    include: {

                        logProperty: true,
                        Device:
                        {
                            include:
                            {
                                Product: { include: { product_properties: true } },
                                Site: true
                            }
                        },
                    }
                }
            }
        })
        // console.log(device)
        return { log_devices: device.log_devices }
    }


    async getLogByDeviceLast(query: GetLogByDeviceDto) {

        try{
            const device = await this.prismaService.device.findUnique({
                where: { id: query.deviceId },
                include: {
                    log_devices: {
                        skip: query.skip,
                        take: query.take,
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            logProperty: true,
                            Device:
                            {
                                include:
                                {
                                    Product: { include: { product_properties: true } },
                                    Site: true
                                } 
                            },
                        }
                    }
                }
            })
            return { log_devices: device.log_devices }
        }catch(error){

            return {  }
        }
        // console.log(device.length)
        // console.log(device)
    }

    async getDate(query: GetLogDto) {
        const log = await this.prismaService.logDevice.findMany({
            skip: query.skip,
            take: query.take,
            where:{
                createdAt:{
                    gte: new Date()
                }
            },
            include: {
                Device:
                {
                    include:
                    {
                        Product: { include: { product_properties: true } },
                        Site: true
                    }
                },
                logProperty: true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_devices: log }
    }

    async getToDay(query: GetLogByDeviceDto) {
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        console.log("time_start "+time_start.toLocaleString( ))
        console.log("time_end "+time_end.toLocaleString())
        const log = await this.prismaService.logDevice.findMany({
            where:{
                createdAt:{
                    gte:time_start,
                    lte: time_end,
                },
                deviceId: query.deviceId
            },
            include: {
                logProperty: true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_devices: log }
    }
    async getCountToDay(query: GetLogByDeviceDto) {
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        
        console.log("time_start "+time_start.toLocaleString( ))
        console.log("time_end "+time_end.toLocaleString())
        const log_number = await this.prismaService.logDevice.count({
            skip: query.skip,
            where:{
                createdAt:{
                    gte:time_start,
                    lte: time_end,
                },
                deviceId: query.deviceId
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_count:log_number}
    }

    async getCountDayPerMinute(query: GetLogByDeviceDto){
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        var list_timeStart = [];
        var list_timeEnd = [];

        
        var list_count:number[] = []
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + 10)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeEnd.push(time_end)
        var i = 0
        var list_timeShow = []

        for (let t in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            
            
            list_timeShow.push(show_time)
            var log_number = await this.prismaService.logDevice.count({
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
            
            list_count.push(log_number)
            i = i+1
        }

        return { log_count:list_count}
    }

    
    async getDataDayPerMinute(query: GetLogByDeviceDto){
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        var list_timeStart = [];
        var list_timeEnd = [];

        
        const list_log = []
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + 10)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeEnd.push(time_end)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logDevice.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                include: {
                    logProperty: true
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

        return { log_devices:list_log}
    }
    
    async getDataDayPerMinuteWithTimeSearch(query: GetLogByDeviceDto){
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        var list_timeStart = [];
        var list_timeEnd = [];

        
        const list_log = []
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + 10)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeEnd.push(time_end)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logDevice.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                include: {
                    logProperty: true
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

        return { log_time:list_timeStart,log_devices:list_log}
    }
    
    async getDataDayPerHourWithTimeSearch(query: GetLogByDeviceDto){
        
        let time_start = new Date()
        time_start.setHours(0,0,0,1)
        let time_end = new Date()
        time_end.setHours(23,59,59,999)
        var list_timeStart = [];
        var list_timeEnd = [];
        console.log("getDataDayPerHourWithTimeSearch EndTime",time_end.toString())
        console.log("getDataDayPerHourWithTimeSearch Starttime",time_start.toString())

        
        const list_log = []
        
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + 30)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        list_timeEnd.push(time_end)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logDevice.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                include: {
                    logProperty: true
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

        return { log_time:list_timeStart,log_devices:list_log}
    }

    
    async getDataPerHourByTimeSelect(query: GetLogByDeviceDateDto){
        
        let time_start = new Date(query.timeStart)
        // time_start.setHours(0,0,0,1)
        let time_end = new Date(query.timeEnd)
        // time_end.setHours(23,59,59,999)
        var list_timeStart = [];
        var list_timeEnd = [];
        console.log("getDataPerHourByTimeSelect EndTime",time_end.toString())
        console.log("getDataPerHourByTimeSelect Starttime",time_start.toString())

        
        const list_log = []
        
        for (var d = time_start; d <= time_end; d.setMinutes(d.getMinutes() + 60)) {
            list_timeStart.push(new Date(d));
            if(list_timeStart.length > 1){
                list_timeEnd.push(new Date(d));

                
            }
        }
        // list_timeEnd.push(time_end)
        list_timeStart.splice(list_timeStart.length -1,1)

        for (let i in list_timeStart){
            var show_time = list_timeStart[i].toLocaleString()+ " "+ list_timeEnd[i].toLocaleString()
            
            var log_number = await this.prismaService.logDevice.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                include: {
                    logProperty: true
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

        return { log_time:list_timeStart,log_devices:list_log}
        // return { list_timeStart:list_timeStart,list_timeEnd:list_timeEnd}
    }

    async getDataByTimeCustomDataLenght(query: GetLogByDeviceDateDto){

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
            
            var log_number = await this.prismaService.logDevice.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    deviceId: query.deviceId
                },
                include: {
                    logProperty: true
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
