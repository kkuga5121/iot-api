
import { Controller, Get, Inject, Query ,Post,Body,Param,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { IdDto } from './dto/user.dto';
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

    
}
