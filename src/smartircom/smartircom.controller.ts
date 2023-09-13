import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { SmartIrComService } from './smartircom.service';
import { GetCommand } from './dto/smartircom.dto';
import { query } from 'express';
@ApiTags('smartircom')
@Controller('smartircom')
export class SmartIrComController{
    constructor(
        private readonly smartircomservice : SmartIrComService
    ) { }


    @Get()
    getCom(){
        return this.smartircomservice.get();
    }
    @Get('TypeCom')
    @ApiQuery({type : GetCommand})
    getSiteWithDevice(@Query() query){
        return this.smartircomservice.getWithCommand(query);
    }
}