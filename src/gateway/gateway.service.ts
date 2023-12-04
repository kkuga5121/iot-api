import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGatewayOrUpdateDto ,GetById} from './dto/gateway.dto';
import { connect } from 'http2';

@Injectable()
export class GatewayService {
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async createOrUpdate(data: CreateGatewayOrUpdateDto) {
        let {id ,name,siteId} =data;
        const gateway = await this.prismaService.gateway.findUnique({
            where: { id: id },
        })
        const sites = await this.prismaService.site.findUnique({
            where: { id: siteId },
        })
        if(sites!=null){
            if(!gateway){
                const create = await this.prismaService.gateway.create({
                    data: {
                        id, name,
                        Site: { connect: { id: siteId } },
    
                    }
                });
                return create;
            }else{
                const update = await this.prismaService.gateway.update({
                    data: {
                        id, name,siteId
                    },
                    where: {
                        id,
                    },
                    include: {
                        Site: true
                    }
                });
                return update;
            }
        }else{
            return {error:{site:sites}};
        }
    }
    async getAllGateWay(){
        const gateway = await this.prismaService.gateway.findMany({
            include:{
                devicesOwon:true,
                Site:true,
            }
        })
        return gateway;
    }
    async deleteGateWay(data:GetById){
        const deletegateway = await this.prismaService.gateway.delete({
            where: {
              id: data.id ,
            },
        })
        return deletegateway;
    }
    async CheckId(query:GetById){
        try {
            const gatewayData = await this.prismaService.gateway.findUnique({
                where: { id: query.id },
            })
            
            if(!gatewayData){
                return {check:false,gateway:gatewayData};

            }else{
                return {check:true,gateway:gatewayData};
            }
        } catch (error) {
            return error
        }

    }
}

