import { Inject, Injectable } from '@nestjs/common';
import { TrazoGuardadoDto } from '../dto/trazo_guardado.dto';
import { TrazoGuardado } from '../entity/trazo_guardado.entity';
import { TrazoGuardadoRepository } from '../repository/trazo_guardado.repository';

@Injectable()
export class TrazoGuardadoService {
  constructor(
    @Inject(TrazoGuardadoRepository)
    private trazoGuardadoRepository: TrazoGuardadoRepository
  ){}

  async getAllTrazosGuardados(): Promise<TrazoGuardado[]>{
    const trazos: TrazoGuardado[] = await this.trazoGuardadoRepository.findAllTrazosGuardados()
    return trazos;
  }

  async getSpecificTrazo(idTrazoGuardado){
    return this.trazoGuardadoRepository.findTrazoGuardadoById(idTrazoGuardado);
  }
}
