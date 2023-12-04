import { Test, TestingModule } from '@nestjs/testing';
import { RCFSiteController } from './rcfsite.controller';

describe('RCFSiteController', () => {
  let controller: RCFSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RCFSiteController],
    }).compile();

    controller = module.get<RCFSiteController>(RCFSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
