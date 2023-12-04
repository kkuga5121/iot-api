import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class lineNotifyQuery {
    @IsString()
    @ApiProperty()
    message: string;
}
export class lineNotifyWithTokenQuery {
    @IsString()
    @ApiProperty()
    message: string;

    @IsString()
    @ApiProperty()
    token: string;
}