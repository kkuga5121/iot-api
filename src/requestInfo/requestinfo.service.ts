import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';
import { CreateRequestInfoDto,getRequestDto } from './dto/requestinfo.dto';
import internal from 'stream';
@Injectable()
export class RequestInfoService{
    constructor(
        private readonly prismaService: PrismaService,
    ){}
    
    async get() {
        const info = await this.prismaService.requestGetInfo.findMany({
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
        return { request: info }
    }
    async getRequestByDeviceTypeCommend(query:getRequestDto){
        
        try{
            const request = await this.prismaService.requestGetInfo.findFirst({
                where: { deviceType:parseInt(query.deviceType +"") ,
                command:query.command }
            })
            return { request_info: request }
        }catch(error){

            return { request_info:error }
        }
    }
}