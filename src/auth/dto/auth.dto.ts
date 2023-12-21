import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto{
    
    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    password: string;

}