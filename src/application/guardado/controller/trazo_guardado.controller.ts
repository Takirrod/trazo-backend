import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { PasoGuardado } from '../entity/paso_guardado.entity';
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




  @UseGuards(JwtAuthGuard)
  @Delete('paso/:id')
  async deletePaso(@Param('id') idPaso: number){
    return await this.trazoGuardadoService.deletePasoById(idPaso);
  }

  @UseGuards(JwtAuthGuard)
  @Put('paso')
  async updatePaso(@Body() body: Partial<PasoGuardado>){
    return this.trazoGuardadoService.updatePaso(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put('paso/list')
  async updatePasos(@Body() body: PasoGuardado[]){
    return this.trazoGuardadoService.updatePasos(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('paso')
  async savePaso(@Body() body: Partial<PasoGuardado>): Promise<PasoGuardado>{
    return this.trazoGuardadoService.createPaso(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('paso/trazo/:id')
  async getPasosByTrazoId(@Param('id') trazoId: number): Promise<PasoGuardado[]>{
    return await this.trazoGuardadoService.getPasosByTrazoId(trazoId);
  }
}