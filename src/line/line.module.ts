import { Module   } from '@nestjs/common';
import { LineController } from './line.controller';
import { HttpService,HttpModule } from '@nestjs/axios';
import { lineService } from './line.service';
@Module({
  imports:[HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),],
  controllers: [LineController],
  providers: [lineService],
})
export class LineModule {}