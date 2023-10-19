
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { lineService } from './line.service';
import { lineNotifyQuery } from './dto/line.dto';
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
}