import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateRequestInfoDto{
    @IsString()
    @ApiProperty()
    id: string;


    @IsString()
    @ApiProperty()
    type: string;
    
    @IsString()
    @ApiProperty()
    command: string;
    
    @IsString()
    @ApiProperty()
    deviceType: string;

    @IsString()
    @ApiProperty()
    requestData: JSON;
    
}
export class getRequestDto{
    
    @IsString()
    @Type(() => String) @IsString()
    @ApiProperty({
        type: String,
        default: "update"
    })
    type: string;
    
    @IsString()
    @Type(() => String) @IsString()
    @ApiProperty({
        type: String,
        default: "command"
    })
    command: string;
    
    @IsInt()
    @ApiProperty()
    deviceType: number;
}
