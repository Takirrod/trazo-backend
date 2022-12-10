import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { Rol } from '../entity/rol.entity';
import { RolService } from '../service/rol.service';

@Controller('rol')
@UseGuards(AuthGuard('jwt'))
export class RolController {
  constructor(
    private readonly rolService: RolService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllRoles() {
    return await this.rolService.getAllRoles()
  }

  @UseGuards(JwtAuthGuard)
  @Get('public')
  async getPublicRoles() {
    return await this.rolService.getAllPublicRoles()
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRol(@Body() body: Rol): Promise<Rol>{
    return this.rolService.saveRol(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('get')
  async getRoles(@Body() body: {roles: number[]}): Promise<Rol[]>{
    return await this.rolService.getRolesById(body.roles);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getRolesByUserId(@Param('id') usuarioId: number): Promise<Rol[]>{
    return await this.rolService.getRolesByUserId(usuarioId)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async modifyRol(@Body() body: Partial<Rol>){
    return await this.rolService.updateRol(body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteRol(@Param('id') rolId: number){
    return await this.rolService.deleteRol(rolId)
  }
}
