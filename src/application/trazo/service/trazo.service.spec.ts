import { Test, TestingModule } from '@nestjs/testing';
import { TrazoService } from './trazo.service';

describe('TrazoService', () => {
  let service: TrazoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrazoService],
    }).compile();

    service = module.get<TrazoService>(TrazoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
