import { Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { Paso } from 'src/application/trazo/entity/paso.entity';
import { Trazo } from 'src/application/trazo/entity/trazo.entity';
import { PasoRepository } from 'src/application/trazo/repository/paso.repository';
import { TrazoRepository } from 'src/application/trazo/repository/trazo.repository';
import { RolUsuario } from 'src/core/authorization/entity/rol_usuario.entity';
import { DataSource } from 'typeorm';
import { RolRepository } from '../repository/rol.repository';

@Injectable()
export class RolService {
  constructor(
    @Inject(RolRepository)
    private rolRepository: RolRepository,
    @Inject(PasoRepository)
    private pasoRepository: PasoRepository,
    @Inject(TrazoRepository)
    private trazoRepository: TrazoRepository,
    private dataSource: DataSource,
  ) { }

  async saveRol(rol: Rol): Promise<Rol> {
    return await this.rolRepository.saveRol(rol)
  }

  async getRolesById(rol: number[]): Promise<Rol[]>{
    let roles: Rol[] = [];
    for(let i = 0; i < rol.length; i++){
      const rolFinded = await this.rolRepository.findRolById(rol[i])
      roles.push(rolFinded)
    }
    return roles;
  }

  async getRolesByUserId(userId: number): Promise<Rol[]>{
    return await this.rolRepository.findRolesByUserId(userId);
  }

  async getAllRoles(){
    return await this.rolRepository.findAllRoles()
  }

  async getAllPublicRoles(){
    return await (await this.rolRepository.findPublicRoles()).filter(rol => rol.nombre != 'USUARIO')
  }

  async updateRol(partialRol: Partial<Rol>){
    const response = await this.rolRepository.updateRol(partialRol);
    if(response.affected === 0){
      return {
        "mensaje": "No se actualizo ningun rol"
      }
    }else{
      return {
        "mensaje": `Se actualizo ${response.affected} rol(es)`
      }
    }
  }

  async deleteRol(rolId: number){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let response;

    try{
      const pasos: Paso[] = await this.pasoRepository.findPasosByRol(rolId)
      await Promise.all(
        pasos.map(async paso => {
          const partialPaso: Partial<Paso> = {
            idRol: null
          }
          return await queryRunner.manager.update(Paso, paso.id, partialPaso)
        })
      )

      const trazos: Trazo[] = await this.trazoRepository.findTrazosByRol(rolId);
      await Promise.all(
        trazos.map(async trazo => {
          const partialTrazo: Partial<Trazo> = {
            idRol: null
          }
          return await queryRunner.manager.update(Trazo, trazo.id, partialTrazo)
        })
      )

      const rolesUsuario: RolUsuario[] = await queryRunner.manager.find(RolUsuario, {where: {idRol: rolId}})
      await Promise.all(
        rolesUsuario.map(async rolUsuario => {
          return await queryRunner.manager.delete(RolUsuario, {"idRol":rolUsuario.idRol,"idUsuario":rolUsuario.idUsuario});
        })
      )

      response = await queryRunner.manager.delete(Rol, rolId)

      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    if(response.affected === 0){
      return {
        "mensaje": "No se encontro el rol a borrar"
      }
    }else{
      return {
        "mensaje": `Se elimino ${response.affected} rol(es) correctamente`
      }
    }
  }
}
