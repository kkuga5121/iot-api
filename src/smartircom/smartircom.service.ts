import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetCommand,createIRCommand } from './dto/smartircom.dto';

import { firstValueFrom } from 'rxjs'
@Injectable()
export class SmartIrComService{
    constructor(

        private readonly prismaService: PrismaService,

    ) { }
    async get(){
        const command = await this.prismaService.smartIRCommand.findMany()
        console.log(command)
        return {command}
    }
    async getWithCommand(query :GetCommand){
        const command = await this.prismaService.smartIRCommand.findFirst({
            where:{
                name_type:query.name_type,
                name_com:query.name_com
            }
        })
        console.log(command)
        return command;
    }

}