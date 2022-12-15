import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolService } from 'src/application/rol/service/rol.service';
import { RegisterDto } from 'src/application/usuario/dto/register.dto';
import { UserExists } from 'src/application/usuario/dto/user_exists.dto';
import { Usuario } from 'src/application/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/application/usuario/service/usuario.service';
import { GoogleOauthGuard } from '../guard/google-oauth.guard';
import { AuthenticationService } from '../service/authentication.service';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AuthController {
  constructor(
    private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService,
    private rolService: RolService
  ){}

  @UseGuards(GoogleOauthGuard)
  @Post('register')
  async registerUser(@Body() body: RegisterDto) {
    const user: Usuario = await this.usuarioService.saveUser(body)
    const roles: Rol[] = await this.rolService.getRolesByUserId(user.id)
    return {
      token: await this.authenticationService.generateToken(user.id, body.idRol),
      idUsuario: user.id,
      roles: roles.map(rol => rol.id)
    }
  }

  @UseGuards(GoogleOauthGuard)
  @Post('login')
  async login(@Body() body){
    const {token, email} = body
    const user: UserExists = await this.usuarioService.getUserByEmail(email)
    const roles: Rol[] = await this.rolService.getRolesByUserId(user.idUsuario)
    return {
      token: await this.authenticationService.generateToken(user.idUsuario, roles.map(rol => rol.id)),
      idUsuario: user.idUsuario,
      roles: roles.map(rol => rol.id)
    }
  }
}
