import { Controller, Get, Inject, Query ,Post,Body} from '@nestjs/common';
import { ApiTags, ApiQuery,ApiBody } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { CreateGatewayOrUpdateDto ,GetById} from './dto/gateway.dto';
@ApiTags('gateway')
@Controller('gateway')
export class GatewayController{
    constructor(
        private readonly gatewayservice : GatewayService
    ) { }


    @Get()
    getGateway() {
        return this.gatewayservice.getAllGateWay();
    }
    @Post('createAndUpdate')
    @ApiBody({type: CreateGatewayOrUpdateDto})
    portCreateAndUpdateGateway(@Body() query){
        return this.gatewayservice.createOrUpdate({...query});
    }
    
    @Get('delete')
    @ApiQuery({ type: GetById })
    getLogByDeviceLast(@Query() query) {
        return this.gatewayservice.deleteGateWay({ id: query.id })
    }
    @Get('CheckId')
    @ApiQuery({type : GetById})
    getCheckId(@Query() query){
        return this.gatewayservice.CheckId(query);
    }
}