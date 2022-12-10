import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { RolUsuarioService } from '../service/rol_usuario.service';

@Controller('rol_usuario')
@UseGuards(AuthGuard('jwt'))
export class RolUsuarioController {
  constructor(
    private rolUsuarioService: RolUsuarioService
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUsuarioRol(@Body() body): Promise<Rol[]>{
    return await this.rolUsuarioService.saveRolUser(body.userId, body.rol);
  }
}
