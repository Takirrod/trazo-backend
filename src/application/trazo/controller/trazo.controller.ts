import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
import { Trazo } from '../entity/trazo.entity';
import { TrazoGuard } from '../guard/trazo.guard';
import { TrazoService } from '../service/trazo.service';

@Controller('trazo')
@UseGuards(AuthGuard('jwt'))
export class TrazoController {
  constructor(
    private trazoService: TrazoService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get('home')
  async trazoListByUser(@Req() req): Promise<TrazoHomeDto[]>{
    const user = req.user;
    return await this.trazoService.getTrazosByUser(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin')
  async trazoFinishedOrInProcess(@Query('terminados') terminados: boolean){
    return await this.trazoService.getTrazosByState(terminados)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveTrazo(@Body() body: Partial<Trazo>): Promise<Trazo>{
    return this.trazoService.saveTrazo(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async modifyTrazo(@Body() body: Partial<Trazo>){
    return this.trazoService.updateTrazo(body)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TrazoGuard)
  @Delete(':id')
  async removeTrazo(@Param('id') trazoId: number){
    return this.trazoService.deleteTrazo(trazoId)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TrazoGuard)
  @Get(':id')
  async getSingleTrazo(@Param('id') trazoId: number): Promise<Trazo>{
    return await this.trazoService.getSpecificTrazo(trazoId);
  }
}
