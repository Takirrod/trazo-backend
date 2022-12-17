import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
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
}
