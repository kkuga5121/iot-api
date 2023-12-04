import { Controller, Get, Inject, Query ,Post,Body} from '@nestjs/common';
import { SiteService } from './site.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import {CreateOrUpdateSiteDto, GetSiteShow,GetDeviceById,GetDeviceByIdAndShow} from './dto/site.dto';
import { query } from 'express';
@ApiTags('site')
@Controller('site')
export class SiteController{
    
    constructor(
        private readonly siteService : SiteService
    ) { }
    
    @Get()
    getSite(){
        return this.siteService.get();
    }
    @Get('device')
    getSiteWithDevice(){
        return this.siteService.getWithDevice();
    }

    @Get('SiteShow')
    @ApiQuery({type : GetSiteShow})
    getSiteShow(@Query() query){
        
        return this.siteService.getWithShow(query);
    }

    @Get('SiteShowWithLog')
    @ApiQuery({type : GetSiteShow})
    getSiteShowWithLog(@Query() query){
        
        return this.siteService.getWithShowWithLog(query);
    }

    @Get('SiteById')
    @ApiQuery({type : GetDeviceById})
    getSiteWithDeviceById(@Query() query){
        return this.siteService.getSiteWithDeviceLogById(query);
    }
    @Get('SiteSetShow')
    @ApiQuery({type : GetDeviceByIdAndShow})
    setSiteShowById(@Query() query){
        return this.siteService.createOrUpdate({
            id:query.id,
            isShow: query.isShow,
        });
    }
    @Post('createAndUpdate')
    @ApiBody({type: CreateOrUpdateSiteDto})
    portCreateAndUpdateSite(@Body() query){
        return this.siteService.createOrUpdate({...query,isShow:"1"})
    }
    @Get('CheckId')
    @ApiQuery({type : GetDeviceByIdAndShow})
    getCheckId(@Query() query){
        return this.siteService.CheckId(query);
    }
    @Get('delete')
    @ApiQuery({ type: GetDeviceByIdAndShow })
    getLogByDeviceLast(@Query() query) {
        return this.siteService.deleteSite({ id: query.id })
    }
}

