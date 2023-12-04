import { Test, TestingModule } from '@nestjs/testing';
import { DeviceOwonController } from './deviceowon.controller';

describe('DeviceOwonController', () => {
    let service: DeviceOwonController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [DeviceOwonController],
      }).compile();
  
      service = module.get<DeviceOwonController>(DeviceOwonController);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
  