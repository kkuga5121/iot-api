import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateDeviceOrUpdateDto } from './dto/device.dto';
import {DeviceService} from './device.service'
@ApiTags('device')
@Controller('device')
export class DeviceController {
    constructor(
        private readonly deviceService : DeviceService
    ) { }


    @Get()
    getAllDevice() {
        return this.deviceService.getAllDevice()
    }


}
