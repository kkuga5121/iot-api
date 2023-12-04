import { Test, TestingModule } from '@nestjs/testing';
import { RequestInfoController } from './requestinfo.controller';

describe('RequestInfoController', () => {
  let controller: RequestInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestInfoController],
    }).compile();

    controller = module.get<RequestInfoController>(RequestInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
