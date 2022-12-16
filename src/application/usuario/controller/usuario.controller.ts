import { Controller, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import * as dotenv from 'dotenv';
import { Get } from '@nestjs/common';
import { UserExists } from '../dto/user_exists.dto';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

dotenv.config();

@Controller('user')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  @Get('exist')
  async userExists(@Query('email') email: string): Promise<UserExists>{
    return await this.usuarioService.getUserByEmail(email)
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') userId: number){
    return this.usuarioService.deleteUser(userId)
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Get('all')
  async getAllUsers(){
    return await this.usuarioService.getAllUsers();
  }
}
