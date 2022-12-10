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

  async getAllTrazosGuardados(): Promise<TrazoGuardadoDto[]>{
    const trazos: TrazoGuardado[] = await this.trazoGuardadoRepository.findAllTrazosGuardados()
    const trazosGuardados: TrazoGuardadoDto[] = trazos.map(trazo => {
      const trazoGuardado: TrazoGuardadoDto ={
        id: 0,
        numeroPasos: 0,
        descripcion: '',
        nombre: '',
        nombrePasos: [],
      }
      trazoGuardado.id = trazo.id;
      trazoGuardado.numeroPasos = trazo.cantidadPasos;
      trazoGuardado.descripcion = trazo.descripcion;
      trazoGuardado.nombre = trazo.nombre;
      trazoGuardado.nombrePasos = trazo.pasoGuardado.map(pasoGuardado => pasoGuardado.nombre);
      return trazoGuardado;
    })
    return trazosGuardados;
  }

  async getSpecificTrazo(idTrazoGuardado){
    return this.trazoGuardadoRepository.findTrazoGuardadoById(idTrazoGuardado);
  }
}
