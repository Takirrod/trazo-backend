import { Test, TestingModule } from '@nestjs/testing';
import { TrazoController } from './trazo.controller';

describe('TrazoController', () => {
  let controller: TrazoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrazoController],
    }).compile();

    controller = module.get<TrazoController>(TrazoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
