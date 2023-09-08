import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateSiteDto } from './dto/site.dto';
@Injectable()
export class SiteService {
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async createOrUpdate(data: CreateOrUpdateSiteDto) {
        let { id } = data
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
    }

}
