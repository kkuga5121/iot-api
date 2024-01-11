
import { Controller, Get, Inject, Query ,Post,Body,Param,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateUserDto, IdDto, PermitDTo, UsernameDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService
    ) { }
    @UseGuards(JwtGuard)
    @Get("getById")
    @ApiQuery({ type: IdDto })
    async getUserProfile(@Query() query) {
        return await this.userService.getById(query.id);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAll() {
        return await this.userService.getAll();
    }
    
    @UseGuards(JwtGuard)
    @Get("getByRole")
    @ApiQuery({ type: PermitDTo })
    async getByRole(@Query() query) {
        return await this.userService.getAllByRole({...query});
    }
    
    @Get("checkUser")
    @ApiQuery({ type: UsernameDto })
    async getuser(@Query() query) {
        return await this.userService.checkUsernmae(query);
    }

    
    @UseGuards(JwtGuard)
    @Post('update')
    @ApiBody({type: CreateUserDto})
    async updateuser(@Body() query) {
        return await this.userService.update({...query});
    }

    
    @UseGuards(JwtGuard)
    @Get("delete")
    @ApiQuery({ type: UsernameDto })
    async deleteUser(@Query() query) {
        return await this.userService.delete(query);
    }
}
