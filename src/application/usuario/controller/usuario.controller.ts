import { Controller, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import * as dotenv from 'dotenv';
import { Get } from '@nestjs/common';
import { UserExists } from '../dto/user_exists.dto';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

dotenv.config();

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  @Get('exist')
  async userExists(@Query('email') email: string): Promise<UserExists>{
    return await this.usuarioService.getUserByEmail(email)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') userId: number){
    return this.usuarioService.deleteUser(userId)
  }
}
