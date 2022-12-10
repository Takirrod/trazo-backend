import { Controller, Get, Put, Post, Delete, UseGuards, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { Paso } from '../entity/paso.entity';
import { TrazoGuard } from '../guard/trazo.guard';
import { PasoService } from '../service/paso.service';

@Controller('paso')
@UseGuards(AuthGuard('jwt'))
export class PasoController {
  constructor(
    private pasoService: PasoService
  ){}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePaso(@Param('id') idPaso: number){
    return await this.pasoService.deletePasoById(idPaso);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updatePaso(@Body() body: Partial<Paso>){
    return this.pasoService.updatePaso(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put('list')
  async updatePasos(@Body() body: Paso[]){
    return this.pasoService.updatePasos(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async savePaso(@Body() body: Partial<Paso>): Promise<Paso>{
    return this.pasoService.createPaso(body);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TrazoGuard)
  @Get('trazo/:id')
  async getPasosByTrazoId(@Param('id') trazoId: number): Promise<Paso[]>{
    return await this.pasoService.getPasosByTrazoId(trazoId);
  }
}
