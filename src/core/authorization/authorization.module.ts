import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolService } from 'src/application/rol/service/rol.service';
import { PasoRepository } from 'src/application/trazo/repository/paso.repository';
import { TrazoRepository } from 'src/application/trazo/repository/trazo.repository';
import { RolUsuario } from './entity/rol_usuario.entity';
import { RolUsuarioRepository } from './repository/rol_usuario.repository';
import { RolUsuarioService } from './service/rol_usuario.service';
import { RolUsuarioController } from './controller/rol_usuario.controller';

@Module({
  providers: [
    RolUsuarioService, 
    RolUsuarioRepository, 
    RolRepository, 
    RolService,
    PasoRepository,
    TrazoRepository
  ],
  exports:[RolUsuarioService, RolUsuarioRepository],
  imports:[
    TypeOrmModule.forFeature([
      RolUsuario
    ])
  ],
  controllers: [RolUsuarioController]
})
export class AuthorizationModule {}
