import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpsertProductDto {
    @IsString()
    @ApiProperty()
    product_id: string;

    @IsString()
    @ApiProperty()
    product_name: string;







    // @IsString()
    // @ApiProperty()
    // product_name: string;

}