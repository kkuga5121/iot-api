import { Test, TestingModule } from '@nestjs/testing';
import { LogOwonRCFService } from './logowonrcf.service';

describe('LogOwonRCFService', () => {
  let service: LogOwonRCFService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogOwonRCFService],
    }).compile();

    service = module.get<LogOwonRCFService>(LogOwonRCFService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
