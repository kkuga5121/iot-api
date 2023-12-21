
import { Controller, Get, Inject, Query ,Request,Post,Body,UseGuards} from '@nestjs/common';
import { ApiTags, ApiQuery,ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(

        private readonly userService: UserService,
        private readonly authService: AuthService,

    ) { }
    
    @Post('create')
    @ApiBody({type: CreateUserDto})
    async registeruser(@Body() query){
        return this.userService.create({...query});
    }
    
    @Post('login')
    @ApiBody({type: LoginDto})
    async login(@Body() query){
        return await this.authService.login(query)
    }
    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
}
