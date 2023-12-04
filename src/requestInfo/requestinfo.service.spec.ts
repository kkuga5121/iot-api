import { Test, TestingModule } from '@nestjs/testing';
import { RequestInfoService } from './requestinfo.service';

describe('RequestInfoService', () => {
  let service: RequestInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestInfoService],
    }).compile();

    service = module.get<RequestInfoService>(RequestInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
