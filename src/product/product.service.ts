import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertProductDto } from './dto/product.dto';
@Injectable()
export class ProductService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }
    async createOrUpdate(data: UpsertProductDto) {
        let { product_id, product_name } = data
        const product = await this.prismaService.product.upsert({
            where: { product_id: product_id },
            update: { product_name: product_name },
            create: { product_id: product_id, product_name: product_name }
        })
        return product
    }
}
