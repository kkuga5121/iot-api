import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateLogDto {
    @IsString()
    @ApiProperty()
    deviceId: string;

    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    dp_id: string[];

    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    value: string[];

    // @IsString()
    // @ApiProperty()
    // product_name: string;

}

export class GetLogDto {

    @IsInt()
    @Type(() => Number) @IsNumber()
    @ApiProperty({
        type: Number,
        default: 10
    })
    take: number;


    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        type: Number,
        default: 0
    })
    skip: number;


}
export class GetLogByDeviceDto {


    @IsString()
    @ApiProperty()
    deviceId: string;

    @IsInt()
    @Type(() => Number) @IsNumber()
    @ApiProperty({
        type: Number,
        default: 10
    })
    take: number;
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        type: Number,
        default: 0
    })
    skip: number;
}