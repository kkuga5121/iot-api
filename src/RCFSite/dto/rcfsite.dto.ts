import { IsString, IsInt, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrUpdateRCFSiteDto{
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    siteId: string;

    @IsString()
    @ApiProperty()
    powermain_id: string;

    @IsString()
    @ApiProperty()
    powerats_id: string;

    @IsString()
    @ApiProperty()
    temp_id: string;
}

export class RCFById{
    @IsString()
    @ApiProperty()
    id: string;

}

