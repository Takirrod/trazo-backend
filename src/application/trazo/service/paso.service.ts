import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paso } from '../entity/paso.entity';
import { Trazo } from '../entity/trazo.entity';
import { PasoRepository } from '../repository/paso.repository';

@Injectable()
export class PasoService {
  constructor(
    @Inject(PasoRepository)
    private pasoRepository: PasoRepository,
    private dataSource: DataSource
  ){}

  async getPasosByTrazoId(trazoId: number): Promise<Paso[]>{
    return await this.pasoRepository.findPasosByTrazoId(trazoId);
  }

  async deletePasoById(idPaso: number){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let response;
    try{
      response = queryRunner.manager.delete(Paso, idPaso)
      const paso = await queryRunner.manager.findOne(Paso, {where: {id: idPaso}})
      const trazo = await queryRunner.manager.findOne(Trazo, {where: {id: paso.idTrazo}});
      if(trazo.cantidadPasos-1 === 0){
        await queryRunner.manager.delete(Trazo, trazo.id);
      }else{;
        await queryRunner.manager.update(Trazo, trazo.id, {cantidadPasos: trazo.cantidadPasos - 1});
      }
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    if(response.affected === 0){
      return {
        "mensaje": "No se encontro el paso a borrar"
      }
    }else{
      return {
        "mensaje": `Se elimino ${response.affected} paso(S) correctamente`
      }
    }
  }

  async updatePaso(partialPaso: Partial<Paso>){
    let response;
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      response = await queryRunner.manager.update(Paso, partialPaso.id, partialPaso);
      const trazo: Trazo = await queryRunner.manager.getRepository(Trazo)
      .createQueryBuilder("trazo")
      .where("trazo.id = :id", {id: partialPaso.idTrazo})
      .select([
        "trazo"
      ]).getOne();
      const pasos = await queryRunner.manager.getRepository(Paso)
      .createQueryBuilder("paso")
      .where("paso.idTrazo = :id", {id: partialPaso.idTrazo})
      .select([
        "paso"
      ]).orderBy("paso.pasoNumero", "ASC")
      .getMany();
      
      for(let i = 0; i < pasos.length; i++){
        if(pasos[i].estaTerminado === false){
          trazo.pasoActual = pasos[i].pasoNumero;
          break;
        }
      }
      if(trazo.cantidadPasos === partialPaso.pasoNumero){
        trazo.estaTerminado = true;
      }
      await queryRunner.manager.update(Trazo, trazo.id, trazo)
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    if(response.affected === 0){
      return {
        "mensaje": "No se actualizo ningun paso"
      }
    }else{
      return {
        "mensaje": `Se actualizo ${response.affected} paso(s)`
      }
    }
  }

  async updatePasos(pasos: Paso[]){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let contPasos: number = 0;
    try{
      await Promise.all(
        pasos.map(async paso => {
          const response = await queryRunner.manager.update(Paso, paso.id, paso)
          contPasos = contPasos + response.affected
          return response
        })
      )

      const trazo: Trazo = await queryRunner.manager.getRepository(Trazo)
      .createQueryBuilder("trazo")
      .where("trazo.id = :id", {id: pasos[0].idTrazo})
      .select([
        "trazo"
      ]).getOne();

      for(let i = 0; i < pasos.length; i++){
        if(pasos[i].estaTerminado === false){
          trazo.pasoActual = pasos[i].pasoNumero;
          break;
        }
      }

      await queryRunner.manager.update(Trazo, trazo.id, trazo)

      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    if(contPasos === 0){
      return {
        "mensaje": "No se actualizo ningun paso"
      }
    }else{
      return {
        "mensaje": `Se actualizo ${contPasos} paso(s)`
      }
    }
  }

  async createPaso(paso: Partial<Paso>): Promise<Paso>{
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let newPaso: Paso;
    try{
      const trazo: Trazo = await queryRunner.manager.findOne(Trazo, {where: {id: paso.idTrazo}})
      paso.pasoNumero = trazo.cantidadPasos + 1;
      trazo.cantidadPasos += 1;
      await queryRunner.manager.update(Trazo, trazo.id, trazo);
      newPaso = await queryRunner.manager.save(Paso, paso)
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    return newPaso
  }
}
