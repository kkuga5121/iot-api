import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateLineRCFDto,RcfSite ,GetDeviceById,CreateOrUpdateLineRCFDto2} from './dto/lineRCF.dto';
import { all } from 'axios';
@Injectable()
export class LineRCFService{
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async createOrUpdate(data: CreateOrUpdateLineRCFDto) {
        let { id,rcfId } = data
         try {
            const line = await this.prismaService.lineRCF.findUnique({
                where: { id: id },
            })
            if (!line) {
                const create = await this.prismaService.lineRCF.create({
                    data: {
                        name:data.name,
                        lineToken:data.lineToken,
                        list_deviceRcf:{
                            connect:{
                                id:rcfId
                            }
                        }
                    }
                });
    
                return create;
            }
            else {
                const update = await this.prismaService.lineRCF.update({
                    data: {
                        name:data.name,
                        lineToken:data.lineToken,
                        list_deviceRcf:{
                            connect:{
                                id:rcfId
                            }
                        }
                    },
                    where: {
                        id,
                    }
                });
                return update;
            }
        } catch (error) {
            return error
        }
    }

    async createOrUpdate2(data: CreateOrUpdateLineRCFDto2) {
        let { id,list_rcfId } = data
        //  try {
            const line = await this.prismaService.lineRCF.findUnique({
                where: { id: id },include:{
                    list_deviceRcf:true
                }
            })
            if (!line) {
                let create = await this.prismaService.lineRCF.create({
                    data: {
                        name:data.name,
                        lineToken:data.lineToken,
                        list_deviceRcf:{
                            connect:list_rcfId.map(id=>({id}))
                            
                        }
                    }
                });
            }
            else {
                let update = await this.prismaService.lineRCF.update({
                    data: {
                        id:id,
                        name:data.name,
                        lineToken:data.lineToken,
                        list_deviceRcf:{
                            disconnect:line.list_deviceRcf.map(rcf=>({id:rcf.id}))
                        }
                    },
                    where: {
                        id,
                    }
                });
                 update = await this.prismaService.lineRCF.update({
                    data: {
                        id:id,
                        name:data.name,
                        lineToken:data.lineToken,
                        list_deviceRcf:{
                            connect:list_rcfId.map(id=>({id}))
                        }
                    },
                    where: {
                        id,
                    }
                });
                return update;
            }
            return {line:line}
        // } catch (error) {
        //     return error
        // }
    }
    async getAllLineRCF(){
        const line = await this.prismaService.lineRCF.findMany({
            include:{
                list_deviceRcf:true
            }
        })
        return line;
    }
    async delete(query:GetDeviceById){
        const line = await this.prismaService.lineRCF.delete({
            where: {
              id: query.id ,
            },
        })
        return line;
    }
    async getLineById(query :GetDeviceById){
        const line = await this.prismaService.lineRCF.findUnique({
            where:{
                id:query.id
            },
            include:{
                list_deviceRcf:true
            }
        })
        return line;
    }
}