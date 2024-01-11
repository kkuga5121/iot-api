import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto{
    @IsInt()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    permis: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    affiliation: string;
    
}

export class IdDto{
    @IsInt()
    @ApiProperty()
    id: number;

}
export class UsernameDto{
    @IsString()
    @ApiProperty()
    username: string;

}
export class PermitDTo{
    @IsString()
    @ApiProperty()
    permis: string;


}