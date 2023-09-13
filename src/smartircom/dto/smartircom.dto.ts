import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class createIRCommand{
    
    @IsString()
    @ApiProperty()
    name_type: string;
    
    @IsString()
    @ApiProperty()
    remote_id: string;

    @IsString()
    @ApiProperty()
    head: string;
    
    @IsString()
    @ApiProperty()
    name_com: string;
    
    @IsString()
    @ApiProperty()
    command: string;
    
    @IsString()
    @ApiProperty()
    deviceId?: string;

}

export class GetCommand{
    
    @IsString()
    @ApiProperty()
    name_type: string;
    
    @IsString()
    @ApiProperty()
    name_com: string;
    
    @IsString()
    @ApiProperty()
    deviceId?: string;
}