import { Controller, Post, UseGuards, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { RolUsuarioService } from '../service/rol_usuario.service';

@Controller('rol_usuario')
@UseGuards(AuthGuard('jwt'))
export class RolUsuarioController {
  constructor(
    private rolUsuarioService: RolUsuarioService
  ){}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async deleteRolesUsuario(@Body() body){
    return this.rolUsuarioService.updateRolUsuario(body.idUsuario, body.roles);
  }

}
