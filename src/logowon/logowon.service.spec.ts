import { Test, TestingModule } from '@nestjs/testing';
import { LogOwonService } from './logowon.service';

describe('LogOwonService', () => {
  let service: LogOwonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogOwonService],
    }).compile();

    service = module.get<LogOwonService>(LogOwonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
