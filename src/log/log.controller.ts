import { Controller, Get, Inject, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetLogByDeviceDto, GetLogDto } from './dto/log.dto';
@ApiTags('log')
@Controller('log')
export class LogController {
    constructor(
        private readonly logService: LogService
    ) { }


    @Get()
    @ApiQuery({ type: GetLogDto })
    getLog(@Query() query) {
        return this.logService.get({ take: parseInt(query.take), skip: parseInt(query.skip) })
    }

    @Get('device')
    @ApiQuery({ type: GetLogByDeviceDto })
    getLogByDevice(@Query() query) {
        return this.logService.getLogByDevice({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }

    
    @Get('devicelast')
    @ApiQuery({ type: GetLogByDeviceDto })
    getLogByDeviceLast(@Query() query) {
        return this.logService.getLogByDeviceLast({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }

}