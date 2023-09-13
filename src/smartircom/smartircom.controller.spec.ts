import { Test, TestingModule } from '@nestjs/testing';

import { SmartIrComController } from './smartircom.controller';

describe('SiteController', () => {
  let controller: SmartIrComController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartIrComController],
    }).compile();

    controller = module.get<SmartIrComController>(SmartIrComController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});