import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrUpdateSiteDto {
    @IsString()
    @ApiProperty()
    id: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    site?: string;



    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        type: String,
        default: "0"
    })
    isShow? : string;

    // @IsString()
    // @ApiProperty()
    // product_name: string;

}
export class GetSiteShow{
    @IsBoolean()
    @ApiProperty({
        type: String,
        default: "0"
    })
    isShow? : string;
}

export class GetDeviceById{
    @IsString()
    @ApiProperty()
    id: string;
}

export class GetDeviceByIdAndShow{
    @IsString()
    @ApiProperty()
    id: string;
    
    @IsBoolean()
    @ApiProperty({
        type: String,
        default: "0"
    })
    isShow? : string;
}