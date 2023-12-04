import { IsString, IsInt, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDeviceOwonOrUpdateDto{
    @IsString()
    @ApiProperty()
    ieee: string;

    @IsInt()
    @ApiProperty()
    ep: number;

    @IsInt()
    @ApiProperty()
    netDeviceType: number;

    @IsBoolean()
    @ApiProperty()
    linkStatus: boolean;

    @IsInt()
    @ApiProperty()
    deviceType: number;
    
    @IsInt()
    @ApiProperty()
    IASZoneType: number;
    
    @IsInt()
    @ApiProperty()
    ProfileId: number;

    @IsString()
    @ApiProperty()
    name: string;
    
    @IsInt()
    @ApiProperty()
    clusterFlag: number;
    
    @IsInt()
    @ApiProperty()
    manuCode: number;
    
    @IsString()
    @ApiProperty()
    devModel: string;
    
    @IsString()
    @ApiProperty()
    gateway_ieee: string;
}

export class DeivceById{
    @IsString()
    @ApiProperty()
    ieee: string;

}