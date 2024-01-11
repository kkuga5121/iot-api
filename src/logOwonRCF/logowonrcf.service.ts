import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';
import { CreateLogOwonRCFDto ,logRCFByRcfId,GetLogOwonRcfDto,RcfId,GetLogOwonRcfByDateDto} from './dto/logowonrcf.dto';
import { json } from 'stream/consumers';
@Injectable()
export class LogOwonRCFService{
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async create(data: CreateLogOwonRCFDto) {
        let {id ,powerStatus,rcfId,powerMain_Data,powerATS_Data,temp_Data} =data;
        const createLogRcf = await this.prismaService.logOwonRCF.create({
            data: {
                powerStatus: powerStatus,
                rcfId: rcfId,
                powerMain_Data: powerMain_Data,
                powerATS_Data:powerATS_Data,
                temp_Data:temp_Data,
            }
        });
        // console.log("createLogRcf " + createLogRcf)
        return {  createLogRcf }
    }
    async get(query: GetLogOwonRcfDto) {
        const log = await this.prismaService.logOwonRCF.findMany({
            skip: query.skip,
            take: query.take,
            include: {
                deviceRcf:true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { log_devices: log }
    }
    async getRcfSiteByID(query :logRCFByRcfId){
        try{
            const log = await this.prismaService.rCFSite.findUnique({
                where: { id: query.rcfId },
                include: {
                    Site:true,
                    log_rcf: {
                        skip: query.skip,
                        take: query.take,
                        orderBy: {
                            createdAt: 'desc'
                        },
                    }
                }
            })
            return { log_devices: log }
        }catch(error){
            return { log_devices: null }

        }
    }
    async deleteRCFSite(query :RcfId){
        const deleteRCF = await this.prismaService.logOwonRCF.deleteMany({
            where:{
                rcfId:query.rcfId
            }
        })
        return{deleteRCF:deleteRCF}
    }

    async getDataByTimeCustomDataLenght(query: GetLogOwonRcfByDateDto){

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
        time_compaMinute =time_compaMinute /  100
        
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
            
            var log_number = await this.prismaService.logOwonRCF.findFirst({
                take:query.take,
                where:{
                    createdAt:{
                        gte:list_timeStart[i],
                        lte: list_timeEnd[i],
                    },
                    
                    rcfId: query.rcfId
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