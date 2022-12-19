import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoGuardado } from '../entity/trazo_guardado.entity';
import { TrazoGuardadoService } from '../service/trazo_guardado.service';

@Controller('guardado')
@UseGuards(AuthGuard('jwt'))
export class TrazoGuardadoController {
  constructor(
    private trazoGuardadoService: TrazoGuardadoService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllTrazosGuardados(){
    return this.trazoGuardadoService.getAllTrazosGuardados()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async singleTrazo(@Param('id') trazoGuardadoId: number): Promise<TrazoGuardado>{
    return await this.trazoGuardadoService.getSpecificTrazo(trazoGuardadoId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveTrazoGuardado(@Body() body: Partial<TrazoGuardado>): Promise<TrazoGuardado>{
    return this.trazoGuardadoService.saveTrazoGuardado(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async modifyTrazo(@Body() body: Partial<TrazoGuardado>){
    return this.trazoGuardadoService.updateTrazoGuardado(body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeTrazo(@Param('id') trazoId: number){
    return this.trazoGuardadoService.deleteTrazoGuardado(trazoId)
  }
}