import { Module } from '@nestjs/common';
import { TrazoGuardadoService } from './service/trazo_guardado.service';
import { TrazoGuardadoController } from './controller/trazo_guardado.controller';
import { TrazoGuardadoRepository } from './repository/trazo_guardado.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrazoGuardado } from './entity/trazo_guardado.entity';

@Module({
  providers: [TrazoGuardadoService, TrazoGuardadoRepository],
  controllers: [TrazoGuardadoController],
  imports:[
    TypeOrmModule.forFeature([
      TrazoGuardado
    ])
  ]
})
export class GuardadoModule {}
