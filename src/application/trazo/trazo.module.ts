import { Module } from '@nestjs/common';
import { TrazoService } from './service/trazo.service';
import { TrazoController } from './controller/trazo.controller';
import { TrazoRepository } from './repository/trazo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trazo } from './entity/trazo.entity';
import { PasoService } from './service/paso.service';
import { PasoController } from './controller/paso.controller';
import { Paso } from './entity/paso.entity';
import { PasoRepository } from './repository/paso.repository';

@Module({
  providers: [TrazoService, TrazoRepository, PasoService, PasoRepository],
  controllers: [TrazoController, PasoController],
  imports: [
    TypeOrmModule.forFeature([
      Trazo, 
      Paso
    ])
  ]
})
export class TrazoModule {}
