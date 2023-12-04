import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateLogOwonDto{
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    deviceId: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    type: string;
    
    @IsString()
    @ApiProperty()
    command: string;
    
    @IsString()
    @ApiProperty()
    message: string;
    
}

export class GetLogOwonDto {

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
export class GetLogOwonByDeviceDto {


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

export class GetLogOwonByDeviceCommandDto {


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

    
    @IsString()
    @Type(() => String) @IsString()
    @ApiProperty({
        type: String,
        default: "command"
    })
    command: string;
}
export class GetLogOwonByDeviceDateDto {


    @IsString()
    @ApiProperty()
    deviceId: string;

    @IsDate()
    @Type(()=> Date)
    @ApiProperty({
        type:Date,
        default: new Date()
    })
    timeStart:Date;
    
    @IsDate()
    @Type(()=> Date)
    @ApiProperty({
        type:Date,
        default: new Date()
    })
    timeEnd:Date;

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

    @IsString()
    @Type(() => String) @IsString()
    @ApiProperty({
        type: String,
        default: "description"
    })
    description: string;

}