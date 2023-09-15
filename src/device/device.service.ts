import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceOrUpdateDto } from './dto/device.dto';
import { connect } from 'http2';

@Injectable()
export class DeviceService {
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async createOrUpdate(data: CreateDeviceOrUpdateDto) {
        console.log(data)
        let { id, productId, local_key, ip, model, siteId,sensor_type,name } = data
        const device = await this.prismaService.device.findUnique({
            where: { id: id },
        })
        if (!device) {
            const create = await this.prismaService.device.create({
                data: {
                    id, local_key, ip, model,sensor_type,name,
                    Product: { connect: { product_id: productId } },
                    Site: { connect: { id: siteId } }

                }
            });

            return create;
        }
        else {
            const update = await this.prismaService.device.update({
                data: {
                    id, local_key, ip, model, productId, siteId,sensor_type,name
                },
                where: {
                    id,
                },
                include: {
                    Product: true
                }
            });
            return update;
        }
    }
    async getAllDevice() {
        const device = await this.prismaService.device.findMany({
            include: {
                Product: { include: { product_properties: true } },
                Site: true
            }
        })

        return device
    }
}
