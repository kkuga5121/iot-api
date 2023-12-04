import { Test, TestingModule } from '@nestjs/testing';
import { LogOwonRCFController } from './logowonrcf.controller';

describe('LogOwonRCFController', () => {
  let controller: LogOwonRCFController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogOwonRCFController],
    }).compile();

    controller = module.get<LogOwonRCFController>(LogOwonRCFController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
