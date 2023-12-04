import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { DeviceOwonService } from './deviceowon.service';
import { CreateDeviceOwonOrUpdateDto,DeivceById } from './dto/deviceowon.dto';
@ApiTags('deviceowon')
@Controller('deviceowon')
export class DeviceOwonController {
    constructor(
        private readonly deviceowonservice : DeviceOwonService
    ) { }


    @Get()
    getAllDevice() {
        return this.deviceowonservice.getAllDevice()
    }
    
    @Get('deviceById')
    @ApiQuery({ type: DeivceById })
    getDeviceById(@Query() query){
        return this.deviceowonservice.getDeviceByID({...query})
    }
    @Get('delete')
    @ApiQuery({ type: DeivceById })
    getLogByDeviceLast(@Query() query) {
        return this.deviceowonservice.deleteDeviceOwon({...query})
    }
}