import { Controller, Get,Post, Inject, Query,Body } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { LogOwonRCFService } from './logowonrcf.service';
import { CreateLogOwonRCFDto,GetLogOwonRcfDto,logRCFByRcfId,GetLogOwonRcfByDateDto } from './dto/logowonrcf.dto';
@ApiTags('logowonrcf')
@Controller('logowonrcf')
export class LogOwonRCFController{
    constructor(
        private readonly logOwonRcfService: LogOwonRCFService
    ) { }
    
    @Post('postCreateLogOwonRcf')
    @ApiBody({ type: CreateLogOwonRCFDto })
    postCreateLogOwonRcf(@Body() query){
        return this.logOwonRcfService.create({
            ...query
        })
    }
    @Get('get')
    @ApiQuery({ type: GetLogOwonRcfDto })
    getLog(@Query() query) {
        return this.logOwonRcfService.get({ take: parseInt(query.take), skip: parseInt(query.skip) })
    }

    @Get('delete')
    @ApiQuery({ type: logRCFByRcfId })
    deleteRCFSite(@Query() query) {
        return this.logOwonRcfService.deleteRCFSite({...query})
    }
    @Get('logrcflast')
    @ApiQuery({ type: logRCFByRcfId })
    getLogByDeviceLast(@Query() query) {
        return this.logOwonRcfService.getRcfSiteByID({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip), 
             rcfId: query.rcfId})
    }
    @Post('getDataByTimeCustom')
    @ApiBody({ type: GetLogOwonRcfByDateDto })
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
        return this.logOwonRcfService.getDataByTimeCustomDataLenght({ 
            take: parseInt(query.take),
             skip: parseInt(query.skip),
              deviceId: query.deviceId,
              timeEnd:query.timeEnd,
            timeStart:query.timeStart,...query })
    }
}

