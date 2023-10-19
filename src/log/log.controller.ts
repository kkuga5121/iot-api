import { Controller, Get,Post, Inject, Query,Body } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { GetLogByDeviceDateDto, GetLogByDeviceDto, GetLogDto } from './dto/log.dto';
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

    @Get('getLogToday')
    @ApiQuery({ type: GetLogByDeviceDto })
    getLogByDate(@Query() query) {
        return this.logService.getToDay({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }

    
    @Get('getCountLogToday')
    @ApiQuery({ type: GetLogByDeviceDto })
    getCountLogByDate(@Query() query) {
        return this.logService.getCountToDay({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }
    @Get('getCountLogTodayPerMinute')
    @ApiQuery({ type: GetLogByDeviceDto })
    getCountLogByDatePerMinute(@Query() query) {
        return this.logService.getCountDayPerMinute({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }
    @Get('getDataLogTodayPerMinute')
    @ApiQuery({ type: GetLogByDeviceDto })
    getDataLogByDatePerMinute(@Query() query) {
        return this.logService.getDataDayPerMinuteWithTimeSearch({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }

    @Get('getDataLogTodayPerHour')
    @ApiQuery({ type: GetLogByDeviceDto })
    getDataLogByDatePerHour(@Query() query) {
        return this.logService.getDataDayPerHourWithTimeSearch({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId })
    }
    @Post('getDataLogFromDate')
    @ApiBody({ type: GetLogByDeviceDateDto })
    getDataLogFromDatePerHour(@Body() query) {
        let ts = new Date(query.timeStart)
        let te = new Date(query.timeEnd)
        query.timeStart = ts
        query.timeEnd = te
        console.log("getDataLogFromDatePerHour EndTime",query.timeEnd.toString())
        console.log("getDataLogFromDatePerHour Starttime",query.timeStart.toString())
        // return {
        //     startTime:ts.toLocaleString() + " ddd",
        //     endTime:te.toLocaleString(),
        //     "query.timeStart":query.timeStart+ " ddd",
        //     "query.timeEnd":query.timeEnd.toLocaleString(),
        // }
        return this.logService.getDataPerHourByTimeSelect({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip),
              deviceId: query.deviceId,
              timeEnd:query.timeEnd,
            timeStart:query.timeStart })
   
    }

    
    @Post('getDataByTimeCustom')
    @ApiBody({ type: GetLogByDeviceDateDto })
    getDataByTimeCustom(@Body() query) {
        let ts = new Date(query.timeStart)
        let te = new Date(query.timeEnd)
        query.timeStart = ts
        query.timeEnd = te
        console.log("getDataLogFromDatePerHour EndTime",query.timeEnd.toString())
        console.log("getDataLogFromDatePerHour Starttime",query.timeStart.toString())
        // return {
        //     startTime:ts.toLocaleString() + " ddd",
        //     endTime:te.toLocaleString(),
        //     "query.timeStart":query.timeStart+ " ddd",
        //     "query.timeEnd":query.timeEnd.toLocaleString(),
        // }
        return this.logService.getDataByTimeCustomDataLenght({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip),
              deviceId: query.deviceId,
              timeEnd:query.timeEnd,
            timeStart:query.timeStart })
   
    }
}