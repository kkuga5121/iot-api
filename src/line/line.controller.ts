import { Controller, Get, Inject, Query ,Post,Body} from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { ApiTags,ApiBody, ApiQuery } from '@nestjs/swagger';
import { lineService } from './line.service';
import { lineNotifyQuery,lineNotifyWithTokenQuery} from './dto/line.dto';
@ApiTags('line')
@Controller('line')
export class LineController {
  constructor(
    private readonly lineservice : lineService
    ) {}

  @Get('notify/send')
  @ApiQuery({ type: lineNotifyQuery })
  async send(@Query() query) {
    return this.lineservice.sendLineNotify(query);
  }
  @Post('notify/sendMessage')
  @ApiBody({ type: lineNotifyWithTokenQuery })
  async sendMessage(@Body() query) {
    return this.lineservice.sendLineNotifyToken2(query);
  }
}