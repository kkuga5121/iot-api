import { Test, TestingModule } from '@nestjs/testing';
import { LineRCFController } from './lineRCF.controller';

describe('LineRCFController', () => {
  let controller: LineRCFController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineRCFController],
    }).compile();

    controller = module.get<LineRCFController>(LineRCFController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
