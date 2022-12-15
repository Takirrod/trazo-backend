import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { Rol } from '../entity/rol.entity';
import { RolService } from '../service/rol.service';

@Controller('rol')
export class RolController {
  constructor(
    private readonly rolService: RolService
  ) { }

  @Get('public')
  async getPublicRoles() {
    return await this.rolService.getAllPublicRoles()
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Get('all')
  async getAllRoles() {
    return await this.rolService.getAllRoles()
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('create')
  async createRol(@Body() body: Rol): Promise<Rol>{
    return this.rolService.saveRol(body)
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('get')
  async getRoles(@Body() body: {roles: number[]}): Promise<Rol[]>{
    return await this.rolService.getRolesById(body.roles);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Get('user/:id')
  async getRolesByUserId(@Param('id') usuarioId: number): Promise<Rol[]>{
    return await this.rolService.getRolesByUserId(usuarioId)
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Put('update')
  async modifyRol(@Body() body: Partial<Rol>){
    return await this.rolService.updateRol(body)
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete('delete/:id')
  async deleteRol(@Param('id') rolId: number){
    return await this.rolService.deleteRol(rolId)
  }
}
