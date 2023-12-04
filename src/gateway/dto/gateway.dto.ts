import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGatewayOrUpdateDto{
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    name: string;
    
    @IsString()
    @ApiProperty()
    siteId: string;
}
export class GetById{
    @IsString()
    @ApiProperty()
    id: string;
}