import { Controller, Get, Inject, Query ,Post,Body} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { LineRCFService } from './lineRCF.service';
import { CreateOrUpdateLineRCFDto,CreateOrUpdateLineRCFDto2,GetDeviceById } from './dto/lineRCF.dto';
@ApiTags('lineRCF')
@Controller('lineRCF')
export class LineRCFController{
    
    constructor(
        private readonly lineRCFService : LineRCFService
    ) { }
    
    @Post('createAndUpdate')
    @ApiBody({type: CreateOrUpdateLineRCFDto})
    portCreateAndUpdate(@Body() query){
        return this.lineRCFService.createOrUpdate({...query})
    }
    @Post('createAndUpdate2')
    @ApiBody({type: CreateOrUpdateLineRCFDto2})
    portCreateAndUpdate2(@Body() query){
        return this.lineRCFService.createOrUpdate2({...query})
    }
    @Get()
    getAllDevice() {
        return this.lineRCFService.getAllLineRCF()
    }
    @Get('lineById')
    @ApiQuery({ type: GetDeviceById })
    getDeviceById(@Query() query){
        return this.lineRCFService.getLineById({...query})
    }
    
    @Get('delete')
    @ApiQuery({ type: GetDeviceById })
    getLogByDeviceLast(@Query() query) {
        return this.lineRCFService.delete({ id: query.id })
    }
}