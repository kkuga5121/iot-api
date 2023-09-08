import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrUpdateSiteDto {
    @IsString()
    @ApiProperty()
    id: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    site?: string;



    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;



    // @IsString()
    // @ApiProperty()
    // product_name: string;

}