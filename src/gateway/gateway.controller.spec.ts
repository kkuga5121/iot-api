import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
    let service: GatewayController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [GatewayController],
      }).compile();
  
      service = module.get<GatewayController>(GatewayController);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
  