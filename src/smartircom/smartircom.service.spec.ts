import { Test, TestingModule } from '@nestjs/testing';
import { SmartIrComService } from './smartircom.service';

describe('SiteService', () => {
  let service: SmartIrComService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartIrComService],
    }).compile();

    service = module.get<SmartIrComService>(SmartIrComService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
