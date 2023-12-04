import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrUpdateLineRCFDto {
    @IsString()
    @ApiProperty()
    id: string;


    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    lineToken: string;

    
    @IsString()
    @ApiProperty()
    rcfId: string;
}
export class CreateOrUpdateLineRCFDto2 {
    @IsString()
    @ApiProperty()
    id: string;


    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    lineToken: string;

    
    @IsString()
    @ApiProperty()
    list_rcfId: string[];
}
export class GetDeviceById{
    @IsString()
    @ApiProperty()
    id: string;
}
export class RcfSite{
    @IsString()
    @ApiProperty()
    rcfId: string;
}
export class AddRcfSite{
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    rcfId: string;
}
