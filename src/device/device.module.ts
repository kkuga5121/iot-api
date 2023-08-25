import { Module } from '@nestjs/common';
import { DeviceService } from './device.service'
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
@Module({
    providers: [DeviceService, PrismaService, ProductService]
})
export class DeviceModule { }
