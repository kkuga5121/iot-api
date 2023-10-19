import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class lineNotifyQuery {
    @IsString()
    @ApiProperty()
    message: string;
}