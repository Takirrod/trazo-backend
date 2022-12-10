import { Module } from '@nestjs/common';
import { GuardadoModule } from './guardado/guardado.module';
import { TrazoModule } from './trazo/trazo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [GuardadoModule, TrazoModule, UsuarioModule, RolModule]
})
export class ApplicationModule {}
