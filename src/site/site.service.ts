import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateSiteDto, GetSiteShow ,GetDeviceById, GetDeviceByIdAndShow} from './dto/site.dto';
@Injectable()
export class SiteService {
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async createOrUpdate(data: CreateOrUpdateSiteDto) {
        let { id } = data
        try {
            const sites = await this.prismaService.site.findUnique({
                where: { id: id },
            })
            if (!sites) {
                const create = await this.prismaService.site.create({
                    data: {
                        ...data
                    }
                });
    
                return create;
            }
            else {
                const update = await this.prismaService.site.update({
                    data: {
                        ...data
                    },
                    where: {
                        id,
                    },
                    include: {
                        device: true
                    }
                });
                return update;
            }
        } catch (error) {
            return error
        }
    }
    async get(){
        const sites = await this.prismaService.site.findMany()
        console.log(sites)
        return {sites}
    }
    async getWithDevice(){
        const sites = await this.prismaService.site.findMany({
            include:{
                device:true
            }
        })
        console.log(sites)
        return {sites}
    }
    
    async getWithShow(query : GetSiteShow){
        console.log(query)
        console.log(Boolean(query.isShow))
        const sites = await this.prismaService.site.findMany({
            where:{
                isShow:query.isShow
            },include:{
                device:true
            }
        })
        console.log(sites)
        return {sites}
    }
    async getWithShowWithLog(query : GetSiteShow){
        console.log(query)
        console.log(Boolean(query.isShow))
        const sites = await this.prismaService.site.findMany({
            where:{
                isShow:query.isShow
            },include:{
                device:{
                    include:{
                        log_devices:{
                            skip: 0,
                            take: 1,
                        orderBy:[{
                            id: 'desc'
                        }]}
                    }
                }
            }
        })
        console.log(sites)
        return {sites}
    }
    async getSiteWithDeviceLogById(query :GetDeviceById){
        const sites = await this.prismaService.site.findUnique({
            where:{
                id:query.id
            },include:{
                device:{
                    include:{
                        log_devices:{
                            skip: 0,
                            take: 1,
                        orderBy:[{
                            id: 'desc'
                        }]}
                    }
                }
            }
        })
        return {sites}
    }
}
