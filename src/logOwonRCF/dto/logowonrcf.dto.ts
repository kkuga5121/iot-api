import { IsString, IsInt, Length, IsNotEmpty, IsArray, IsNumber, IsDate, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateLogOwonRCFDto{
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    powerStatus: string;

    @IsString()
    @ApiProperty()
    rcfId: string;

    @IsString()
    @ApiProperty()
    powerMain_Data: string;
    
    @IsString()
    @ApiProperty()
    powerATS_Data: string;

    @IsString()
    @ApiProperty()
    temp_Data: string;
    
}
export class GetLogOwonRcfDto {

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
export class RcfId{
    @IsString()
    @ApiProperty()
    rcfId: string;

}

export class logRCFByRcfId{
    @IsString()
    @ApiProperty()
    rcfId: string;

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
export class GetLogOwonRcfByDateDto {


    @IsString()
    @ApiProperty()
    rcfId: string;

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

    
}