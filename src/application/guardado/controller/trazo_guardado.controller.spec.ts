import { Test, TestingModule } from '@nestjs/testing';
import { TrazoGuardadoController } from './trazo_guardado.controller';

describe('TrazoGuardadoController', () => {
  let controller: TrazoGuardadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrazoGuardadoController],
    }).compile();

    controller = module.get<TrazoGuardadoController>(TrazoGuardadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
