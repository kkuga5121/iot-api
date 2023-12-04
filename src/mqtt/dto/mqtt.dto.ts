

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
export class mqttDeviceOwonName{
    
    @IsString()
    @ApiProperty()
    deviceId: string;
    
    @IsString()
    @ApiProperty()
    gateway_ieee: string;

    @IsString()
    @ApiProperty()
    name: string;
    
}
export class mqttDeviceOwon{
    
    @IsString()
    @ApiProperty()
    deviceId: string;
    
    @IsString()
    @ApiProperty()
    gateway_ieee: string;

    
}

