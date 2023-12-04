import { Test, TestingModule } from '@nestjs/testing';
import { DeviceOwonService } from './deviceowon.service';

describe('DeviceOwonService', () => {
  let service: DeviceOwonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceOwonService],
    }).compile();

    service = module.get<DeviceOwonService>(DeviceOwonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
