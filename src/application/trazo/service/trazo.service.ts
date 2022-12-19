import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
import { Paso } from '../entity/paso.entity';
import { Trazo } from '../entity/trazo.entity';
import { TrazoRepository } from '../repository/trazo.repository';

@Injectable()
export class TrazoService {
  constructor(
    @Inject(TrazoRepository)
    private trazoRepository: TrazoRepository,
    private dataSource: DataSource
  ){}

  async getTrazosByUser(userId: number): Promise<TrazoHomeDto[]>{
    const trazo = await this.trazoRepository.findTrazosByUser(userId)
    const trazosHome: TrazoHomeDto[] = trazo.map(trazo => {
      const trazoHome: TrazoHomeDto ={
        id: 0,
        cantidadPasos: 0,
        descripcion: '',
        nombre: '',
        nombrePasos: [],
        pasoActual: 0
      }
      trazoHome.id = trazo.id;
      trazoHome.cantidadPasos = trazo.cantidadPasos;
      trazoHome.descripcion = trazo.descripcion;
      trazoHome.nombre = trazo.nombre;
      trazoHome.nombrePasos = trazo.paso.map(paso => paso.nombre);
      trazoHome.pasoActual = trazo.pasoActual;
      return trazoHome;
    })
    return trazosHome;
  }

  async getSpecificTrazo(trazoId: number): Promise<Trazo>{
    return await this.trazoRepository.findTrazoById(trazoId);
  }

  async getTrazosByState(terminado: boolean): Promise<Trazo[]>{
    return await this.trazoRepository.findTrazosByState(terminado)
  }

  async saveTrazo(trazo: Partial<Trazo>, idUsuario: number): Promise<Trazo>{
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let newTrazo: Trazo;
    try{
      trazo.pasoActual = 1;
      trazo.cantidadPasos = trazo.paso.length;
      if(trazo.idUsuario === undefined){
        trazo.idUsuario = idUsuario;
      }
      if(!trazo.idRol){
        trazo.idUsuario = null;
      }
      newTrazo = await queryRunner.manager.save(Trazo, trazo);

      await Promise.all(
        trazo.paso.map(async paso => {
          paso.idTrazo = newTrazo.id;
          return await queryRunner.manager.save(Paso, paso)
        })
      )
      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    return newTrazo
  }

  async updateTrazo(partialTrazo: Partial<Trazo>){
    const response = await this.trazoRepository.updateTrazo(partialTrazo);
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

  async deleteTrazo(trazoId: number){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let response;

    try{
      response = await queryRunner.manager.delete(Trazo, trazoId)
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
