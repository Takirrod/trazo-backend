import { Test, TestingModule } from '@nestjs/testing';
import { PasoService } from './paso.service';

describe('PasoService', () => {
  let service: PasoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasoService],
    }).compile();

    service = module.get<PasoService>(PasoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
