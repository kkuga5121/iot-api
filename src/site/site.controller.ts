import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SiteService } from './site.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
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

    @Get('SiteById')
    @ApiQuery({type : GetDeviceById})
    getSiteWithDeviceById(@Query() query){
        return this.siteService.getWithDeviceById(query);
    }
    @Get('SiteSetShow')
    @ApiQuery({type : GetDeviceByIdAndShow})
    setSiteShowById(@Query() query){
        return this.siteService.createOrUpdate({
            id:query.id,
            isShow: query.isShow,
        });
    }
}

