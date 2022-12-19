import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TrazoGuardadoDto } from '../dto/trazo_guardado.dto';
import { PasoGuardado } from '../entity/paso_guardado.entity';
import { TrazoGuardado } from '../entity/trazo_guardado.entity';
import { TrazoGuardadoRepository } from '../repository/trazo_guardado.repository';

@Injectable()
export class TrazoGuardadoService {
  constructor(
    @Inject(TrazoGuardadoRepository)
    private trazoGuardadoRepository: TrazoGuardadoRepository,
    private dataSource: DataSource
  ){}

  async getAllTrazosGuardados(): Promise<TrazoGuardado[]>{
    const trazos: TrazoGuardado[] = await this.trazoGuardadoRepository.findAllTrazosGuardados()
    return trazos;
  }

  async getSpecificTrazo(idTrazoGuardado){
    return this.trazoGuardadoRepository.findTrazoGuardadoById(idTrazoGuardado);
  }

  async saveTrazoGuardado(trazoGuardado: Partial<TrazoGuardado>): Promise<TrazoGuardado>{
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let newTrazoGuardado: TrazoGuardado;
    try{
      trazoGuardado.cantidadPasos = trazoGuardado.pasoGuardado.length;
      newTrazoGuardado = await queryRunner.manager.save(TrazoGuardado, trazoGuardado);

      await Promise.all(
        trazoGuardado.pasoGuardado.map(async paso => {
          paso.idTrazoGuardado = newTrazoGuardado.id;
          return await queryRunner.manager.save(PasoGuardado, paso)
        })
      )
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    return newTrazoGuardado
  }

  async updateTrazoGuardado(partialTrazo: Partial<TrazoGuardado>){
    const response = await this.trazoGuardadoRepository.updateTrazoGuardado(partialTrazo);
    if(response.affected === 0){
      return {
        "mensaje": "No se actualizo ningun trazo"
      }
    }else{
      return {
        "mensaje": `Se actualizo ${response.affected} trazo(s)`
      }
    }
  }

  async deleteTrazoGuardado(trazoId: number){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let response;

    try{
      response = await queryRunner.manager.delete(TrazoGuardado, trazoId)
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    if(response.affected === 0){
      return {
        "mensaje": "No se encontro el trazo a borrar"
      }
    }else{
      return {
        "mensaje": `Se elimino ${response.affected} trazo(s) correctamente`
      }
    }
  }
}
