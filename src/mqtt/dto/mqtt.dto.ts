

import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class mqttDeviceDto {
    @IsString()
    @ApiProperty()
    deviceId: string;

    @IsString()
    @ApiProperty()
    siteId: string;

}
