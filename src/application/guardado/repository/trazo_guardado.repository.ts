import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PasoGuardado } from '../entity/paso_guardado.entity';
import { TrazoGuardado } from '../entity/trazo_guardado.entity';

@Injectable()
export class TrazoGuardadoRepository {
  constructor(
    private dataSource: DataSource
  ){}

  async findAllTrazosGuardados(): Promise<TrazoGuardado[]>{
    const query = this.dataSource
    .getRepository(TrazoGuardado)
    .createQueryBuilder('trazoGuardado')
    .leftJoinAndSelect('trazoGuardado.pasoGuardado', 'pasoGuardado')
    .select([
      'trazoGuardado',
      'pasoGuardado'
    ]);

    return await query.getMany()
  }

  async findTrazoGuardadoById(trazoGuardadoId): Promise<TrazoGuardado>{
    return await this.dataSource
    .getRepository(TrazoGuardado)
    .createQueryBuilder('trazoGuardado')
    .leftJoinAndSelect('trazoGuardado.pasoGuardado', 'pasoGuardado')
    .where('trazoGuardado.id = :id', {id: trazoGuardadoId})
    .select([
      'trazoGuardado',
      'pasoGuardado'
    ]).getOne();
  }

  async updateTrazoGuardado(partialTrazo: Partial<TrazoGuardado>){
    return await this.dataSource.getRepository(TrazoGuardado).update(partialTrazo.id, partialTrazo);
  }



  async findPasosByTrazoId(trazoId): Promise<PasoGuardado[]>{
    const query = this.dataSource.getRepository(PasoGuardado)
    .createQueryBuilder('paso')
    .where('paso.idTrazo = :trazoId', {trazoId: trazoId})
    .select('paso')

    return await query.getMany()
  }
}
