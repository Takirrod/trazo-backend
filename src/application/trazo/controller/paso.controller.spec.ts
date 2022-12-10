import { Test, TestingModule } from '@nestjs/testing';
import { PasoController } from './paso.controller';

describe('PasoController', () => {
  let controller: PasoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasoController],
    }).compile();

    controller = module.get<PasoController>(PasoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
