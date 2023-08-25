import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
@Module({})
export class ProductModule {

    providers: [PrismaService, ProductService]
}
