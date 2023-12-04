import { Test, TestingModule } from '@nestjs/testing';
import { LineRCFService } from './lineRCF.service';

describe('LineRCFService', () => {
  let service: LineRCFService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineRCFService],
    }).compile();

    service = module.get<LineRCFService>(LineRCFService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
