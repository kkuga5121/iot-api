import { Controller, Get,Post, Inject, Query,Body } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RCFSiteService } from './rcfsite.service';
import { CreateOrUpdateRCFSiteDto, RCFById } from './dto/rcfsite.dto';
@ApiTags('rcfsite')
@Controller('rcfsite')
export class RCFSiteController{
    constructor(
        private readonly rcfSiteService: RCFSiteService
    ) { }

    @Get()
    getAllDevice() {
        return this.rcfSiteService.getAllRCF()
    }
    
    @Get('LastLog')
    getAllDeviceWithLast() {
        return this.rcfSiteService.getAllRCFWithLogLast()
    }
    @Get('LastLogWithDeviceOwon')
    getAllRCFWithLogLastWithDeviceOwon() {
        return this.rcfSiteService.getAllRCFWithLogLastWithDeviceOwon()
    }
    @Get('LastLogDeviceLog')
    getAllRCFWithLogLastAndDeviceLog() {
        return this.rcfSiteService.getAllRCFWithLogLastAndDeviceLog()
    }
    
    @Get('RCFById')
    @ApiQuery({ type: RCFById })
    getDeviceById(@Query() query){
        return this.rcfSiteService.getRcfSiteByID({...query})
    }
    @Post('createAndUpdate')
    @ApiBody({type: CreateOrUpdateRCFSiteDto})
    portCreateAndUpdateGateway(@Body() query){
        return this.rcfSiteService.createOrUpdate({...query});
    }
    @Get('RCFByIdWithDevice')
    @ApiQuery({ type: RCFById })
    getRcfSiteByIDWithDevice(@Query() query){
        return this.rcfSiteService.getRcfSiteByIDWithDevice({...query})
    }
    @Get('delete')
    @ApiQuery({ type: RCFById })
    deleteRCFSite(@Query() query){
        return this.rcfSiteService.deleteRCFSite({...query})
    }
}