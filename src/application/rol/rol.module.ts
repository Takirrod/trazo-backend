import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { Paso } from '../trazo/entity/paso.entity';
import { Trazo } from '../trazo/entity/trazo.entity';
import { PasoRepository } from '../trazo/repository/paso.repository';
import { TrazoRepository } from '../trazo/repository/trazo.repository';
import { RolController } from './controller/rol.controller';
import { RolRepository } from './repository/rol.repository';
import { RolService } from './service/rol.service';

@Module({
  controllers: [RolController],
  providers: [RolService, RolRepository, PasoRepository, TrazoRepository],
  imports: [
    TypeOrmModule.forFeature([
      Rol,
      Paso,
      Trazo
    ])
  ],
  exports: [
    RolService
  ]
})
export class RolModule {}
