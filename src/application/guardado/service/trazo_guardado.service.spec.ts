import { Test, TestingModule } from '@nestjs/testing';
import { TrazoGuardadoService } from './trazo_guardado.service';

describe('TrazoGuardadoService', () => {
  let service: TrazoGuardadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrazoGuardadoService],
    }).compile();

    service = module.get<TrazoGuardadoService>(TrazoGuardadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
