import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDeviceOrUpdateDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    local_key: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    ip: string;

    @IsString()
    @ApiProperty()
    model: string;


    @IsString()
    @ApiProperty()
    productId: string;



    @IsString()
    @ApiProperty()
    sensor_type: string;

    // @IsString()
    // @ApiProperty()
    // product_name: string;

}