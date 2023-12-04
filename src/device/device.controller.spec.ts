import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';

describe('DeviceController', () => {
    let service: DeviceController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [DeviceController],
      }).compile();
  
      service = module.get<DeviceController>(DeviceController);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
  