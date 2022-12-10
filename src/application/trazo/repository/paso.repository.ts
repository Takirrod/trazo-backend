import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paso } from '../entity/paso.entity';

@Injectable()
export class PasoRepository {
  constructor(
    private dataSource: DataSource
  ){}

  async findPasosByTrazoId(trazoId): Promise<Paso[]>{
    const query = this.dataSource.getRepository(Paso)
    .createQueryBuilder('paso')
    .where('paso.idTrazo = :trazoId', {trazoId: trazoId})
    .select('paso')

    return await query.getMany()
  }

  async findPasosByRol(rolId: number): Promise<Paso[]>{
    const query = this.dataSource.getRepository(Paso)
    .createQueryBuilder('paso')
    .where('paso.idRol = :rolId', {rolId: rolId})
    .select(['paso'])

    return await query.getMany()
  }

  async updatePaso(partialPaso: Partial<Paso>){
    return await this.dataSource.getRepository(Paso).update(partialPaso.id, partialPaso);
  }

  async deletePaso(idPaso: number){
    return await this.dataSource.getRepository(Paso).delete(idPaso);
  }

  async createPaso(paso: Paso){
    return await this.dataSource.getRepository(Paso).save(paso);
  }
}
