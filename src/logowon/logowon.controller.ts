import { Controller, Get,Post, Inject, Query,Body } from '@nestjs/common';
import { LogOwonService } from './logowon.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { GetLogOwonDto,CreateLogOwonDto,GetLogOwonByDeviceCommandDto
     ,GetLogOwonByDeviceDateDto, GetLogOwonByDeviceDto} from './dto/logowon.dto';
@ApiTags('logowon')
@Controller('logowon')
export class LogOwonController{
    constructor(
        private readonly logOwonService: LogOwonService
    ) { }
    
    @Post('postCreateLogOwon')
    @ApiBody({ type: CreateLogOwonDto })
    postCreateLogOwon(@Body() query){
        return this.logOwonService.create({
            ...query
        })
    }

    @Get('get')
    @ApiQuery({ type: GetLogOwonDto })
    getLog(@Query() query) {
        return this.logOwonService.get({ take: parseInt(query.take), skip: parseInt(query.skip) })
    }

    @Get('devicelast')
    @ApiQuery({ type: GetLogOwonByDeviceDto })
    getLogByDeviceLast(@Query() query) {
        return this.logOwonService.getLogLastById({ take: parseInt(query.take), skip: parseInt(query.skip), deviceId: query.deviceId})
    }


    @Get('devicelastCommand')
    @ApiQuery({ type: GetLogOwonByDeviceCommandDto })
    getLogByDeviceAndCommandLast(@Query() query) {
        return this.logOwonService.getLogLastByIdAndCommand({ 
            take: parseInt(query.take),
            skip: parseInt(query.skip), 
            deviceId: query.deviceId,
            command:query.command })
    }

    @Post('getDataByTimeCustom')
    @ApiBody({ type: GetLogOwonByDeviceDateDto })
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
        return this.logOwonService.getDataByTimeCustomDataLenght({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip),
              deviceId: query.deviceId,
              timeEnd:query.timeEnd,
            timeStart:query.timeStart,...query })
    }
   
    @Post('getDataByTimeCustomCommand')
    @ApiBody({ type: GetLogOwonByDeviceDateDto })
    getDataByTimeCustomCommand(@Body() query) {
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
        return this.logOwonService.getDataByTimeCustomDataLenghtAndCommand({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip),
              deviceId: query.deviceId,
              timeEnd:query.timeEnd,
            timeStart:query.timeStart,...query })
    }

}

