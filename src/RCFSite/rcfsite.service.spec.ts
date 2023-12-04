import { Test, TestingModule } from '@nestjs/testing';
import { RCFSiteService } from './rcfsite.service';

describe('RCFSiteService', () => {
  let service: RCFSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RCFSiteService],
    }).compile();

    service = module.get<RCFSiteService>(RCFSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
