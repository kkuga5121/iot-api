import { Test, TestingModule } from '@nestjs/testing';
import { lineService } from './line.service';

describe('lineService', () => {
  let service: lineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [lineService],
    }).compile();

    service = module.get<lineService>(lineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
