import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto, GetLogByDeviceDto } from './dto/log.dto';
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
            console.log("createLogDevice "+createLogDevice)
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

        const device = await this.prismaService.device.findUnique({
            where: { id: query.deviceId   },
            include: {
                log_devices: {
                    skip: query.skip,
                    take: query.take,
                    orderBy:{
                        updatedAt:'desc'
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
        // console.log(device.length)
        // console.log(device)
        return { log_devices: device.log_devices }
    }

}
