import { Controller, Get,Post, Inject, Query,Body } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RequestInfoService } from './requestinfo.service';
import { CreateRequestInfoDto,getRequestDto } from './dto/requestinfo.dto';
@ApiTags('requestInfo')
@Controller('requestInfo')
export class RequestInfoController{
    constructor(
        private readonly requestInfoService: RequestInfoService
    ) { }
    @Get()
    get() {
        return this.requestInfoService.get()
    }

    @Get('getRequest')
    @ApiQuery({ type: getRequestDto })
    getRequestByDeviceTypeCommend(@Query() query) {
        return this.requestInfoService.getRequestByDeviceTypeCommend({ 
            deviceType: parseInt(query.deviceType), 
            command: query.command,...query })
    }
}