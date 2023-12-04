import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateRCFSiteDto, RCFById } from './dto/rcfsite.dto';
import { string } from 'joi';
@Injectable()
export class RCFSiteService{
    constructor(

        private readonly prismaService: PrismaService,

    ) { }

    async createOrUpdate(data: CreateOrUpdateRCFSiteDto) {
        let { siteId,id,name,
             powerats_id , 
             powermain_id, 
             temp_id, } = data
        const site = await this.prismaService.site.findUnique({
            where:{id:siteId},
        })
        const rcfsite = await this.prismaService.rCFSite.findUnique({
            where: { id: id },
        })
        if(site!=null){
            if (!rcfsite) {
                const create = await this.prismaService.rCFSite.create({
                    data: {
                        siteId,name,
                        powerats_id , 
                        powermain_id, 
                        temp_id}
                });

                return create;
            }
            else {
                const update = await this.prismaService.rCFSite.update({
                    data: {
                        siteId,name,
                        powerats_id , 
                        powermain_id, 
                        temp_id},
                    where: {
                        id,
                    }
                });
                return update;
            }
        }else{
            return {error:{rcfsite:null}}
        }
    }
    async getAllRCF(){
        const rcfsite = await this.prismaService.rCFSite.findMany({
            include:{
                Site:true,
                powerats_device:true,
                powermain_device:true,
                temp_device:true,
            }
        })
        return rcfsite;
    }
    async getAllRCFLine(){
        const rcfsite = await this.prismaService.rCFSite.findMany({
            include:{
                Site:true,
                powerats_device:true,
                powermain_device:true,
                temp_device:true,
                line:true
            }
        })
        return rcfsite;
    }
    async getAllRCFWithLogLast(){
        const rcfsite = await this.prismaService.rCFSite.findMany({
            include:{
                Site:true,
                powerats_device:true,
                powermain_device:true,
                temp_device:true,
                log_rcf:{
                    skip:0,
                    take: 1,
                    select:{
                        id:true,
                        createdAt:true,
                        powerStatus:true,
                        updatedAt:true,
                        rcfId:true,
                        
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                }
            }
        })
        return rcfsite;
    }
    async getAllRCFWithLogLastWithDeviceOwon(){
        const rcfsite = await this.prismaService.rCFSite.findMany({
            include:{
                Site:true,
                log_rcf:{
                    skip:0,
                    take: 1,
                    select:{
                        id:true,
                        createdAt:true,
                        powerStatus:true,
                        updatedAt:true,
                        rcfId:true,
                        
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                },
                powerats_device:true,
                powermain_device:true,
                temp_device:true
            }
        })
        return rcfsite;
    }
    async getAllRCFWithLogLastAndDeviceLog(){
        const rcfsite = await this.prismaService.rCFSite.findMany({
            include:{
                Site:true,
                log_rcf:{
                    skip:0,
                    take: 1,
                    select:{
                        id:true,
                        createdAt:true,
                        powerStatus:true,
                        updatedAt:true,
                        rcfId:true,
                        powerATS_Data:true,
                        powerMain_Data:true,
                        temp_Data:true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                }
            }
        })
        return rcfsite;
    }
    async getRcfSiteByID(query :RCFById){
        const deviceowon = await this.prismaService.rCFSite.findUnique({
            where:{
                id:query.id
            },
            include:{
                Site:true
            }
        })
        return deviceowon;
    }
    async getRcfSiteByIDWithDevice(query :RCFById){
        const deviceowon = await this.prismaService.rCFSite.findUnique({
            where:{
                id:query.id
            },
            include:{
                Site:true,
                powerats_device:true,
                powermain_device:true,
                temp_device:true
            }
        })
        return deviceowon;
    }
    async deleteRCFSite(query :RCFById){
        const deleteRCF = await this.prismaService.rCFSite.delete({
            where:{id:query.id}
        })
        return{deleteRCF:deleteRCF}
    }
}