import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUsuario } from 'src/core/authorization/entity/rol_usuario.entity';
import { RolUsuarioRepository } from 'src/core/authorization/repository/rol_usuario.repository';
import { RolUsuarioService } from 'src/core/authorization/service/rol_usuario.service';
import { Rol } from '../rol/entity/rol.entity';
import { RolRepository } from '../rol/repository/rol.repository';
import { RolService } from '../rol/service/rol.service';
import { PasoRepository } from '../trazo/repository/paso.repository';
import { TrazoRepository } from '../trazo/repository/trazo.repository';
import { UsuarioController } from './controller/usuario.controller';
import { Usuario } from './entity/usuario.entity';
import { UsuarioRepository } from './repository/usuario.repository';
import { UsuarioService } from './service/usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioService, 
    UsuarioRepository, 
    RolRepository, 
    RolUsuarioService, 
    RolUsuarioRepository, 
    RolService,
    PasoRepository,
    TrazoRepository
  ],
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      RolUsuario
    ])
  ],
  exports: [UsuarioService]
})
export class UsuarioModule {}
