import { Test, TestingModule } from '@nestjs/testing';
import { LogOwonController } from './logowon.controller';

describe('LogOwonController', () => {
  let controller: LogOwonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogOwonController],
    }).compile();

    controller = module.get<LogOwonController>(LogOwonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
