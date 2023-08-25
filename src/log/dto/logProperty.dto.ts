import { IsString, IsInt, Length, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LogPropertyDto {

    @IsString()
    @ApiProperty()
    dp_id: string;

    @IsString()
    @ApiProperty()
    value: string;

    // @IsString()
    // @ApiProperty()
    // product_name: string;

}