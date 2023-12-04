import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceOwonOrUpdateDto,DeivceById } from './dto/deviceowon.dto';
import { string } from 'joi';
@Injectable()
export class DeviceOwonService{
    constructor(

        private readonly prismaService: PrismaService,

    ) { }

    async createOrUpdate(data: CreateDeviceOwonOrUpdateDto) {
        let { ieee,
             ep , 
             netDeviceType, 
             linkStatus, 
             deviceType, 
             IASZoneType, 
             ProfileId,name,clusterFlag,manuCode,devModel,gateway_ieee } = data
        let id = ieee+""+ep;
        try{
            const device = await this.prismaService.deviceOWON.findUnique({
                where: { id: id },
            })
            const gateway = await this.prismaService.gateway.findUnique({
                where:{id:gateway_ieee},
            })
            if(gateway!=null){
                let {siteId} = gateway
                if (!device) {
                    const create = await this.prismaService.deviceOWON.create({
                        data: {
                            id , ep, siteId,
                            netDeviceType, ieee,
                            linkStatus, gateway_ieee,
                            deviceType, IASZoneType, ProfileId,name,clusterFlag,manuCode,devModel
                        }
                    });
    
                    return create;
                }
                else {
                    const update = await this.prismaService.deviceOWON.update({
                        data: {id , ep, siteId,
                            netDeviceType, ieee,
                            linkStatus, gateway_ieee,
                            deviceType, IASZoneType, ProfileId,name,clusterFlag,manuCode,devModel
                        },
                        where: {
                            id,
                        }
                    });
                    return update;
                }
            }else{
                return {error:{gateway:null}}
            }
        }catch(error){
            return {error:{gateway:null}}
        }
    }

    async getAllDevice(){
        const deviceowon = await this.prismaService.deviceOWON.findMany({
            include:{
                Site:true
            }
        })
        return deviceowon;
    }
    async getAllDeviceBydeviceType(deviceType :number){
        const deviceowon = await this.prismaService.deviceOWON.findMany({
            where:{
                deviceType:deviceType
            },
            include:{
                Site:true
            }
        })
        return deviceowon;
    }
    async getDeviceByID(query :DeivceById){
        const deviceowon = await this.prismaService.deviceOWON.findUnique({
            where:{
                id:query.ieee
            },
            include:{
                Site:true
            }
        })
        return deviceowon;
    }
    async deleteDeviceOwon(data:DeivceById){
        const deleteLog = await this.prismaService.logOwonReport.deleteMany({
            where:{
                deviceId:data.ieee
            }
        })
        const deleteDeviceOwon = await this.prismaService.deviceOWON.delete({
            where: {
              id: data.ieee ,
            },
        })
        return {deleteDeviceOwon:deleteDeviceOwon,deleteLog:deleteLog};
    }
}