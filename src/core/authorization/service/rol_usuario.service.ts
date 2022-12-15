import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { DataSource } from 'typeorm';
import { RolUsuario } from '../entity/rol_usuario.entity';
import { RolUsuarioRepository } from '../repository/rol_usuario.repository';

@Injectable()
export class RolUsuarioService {
  constructor(
    @Inject(RolRepository)
    private rolRepository: RolRepository,
    @Inject(RolUsuarioRepository)
    private rolUsuarioRepository: RolUsuarioRepository,
    private dataSource: DataSource
  ){}

  async saveRolUser(userId: number, rol: number[]): Promise<Rol[]>{
    let roles: Rol[] = [];
    for(let i = 0; i < rol.length; i++){
      const rolFinded: Rol = await this.rolRepository.findRolById(rol[i])
      roles.push(rolFinded)
      const rolUser = new RolUsuario({
        idRol: rolFinded.id,
        idUsuario: userId
      })
      this.rolUsuarioRepository.saveRolUser(rolUser);
    }
    return roles;
  }

  async updateRolUsuario(userId: number, roles: number[]): Promise<Rol[]>{
    let rolesUsuario = (await this.dataSource.getRepository(RolUsuario)
    .find({where: {idUsuario: userId}}))
    .map(rolUsuario => {
      return {
        idRol: rolUsuario.idRol,
        idUsuario: rolUsuario.idUsuario
      }
    });

    const allRoles: number[] = (await this.dataSource.getRepository(Rol).find()).map(rol => rol.id)
    
    const control: number[] = Object.assign([], rolesUsuario).map(rolUsuario => rolUsuario.idRol);
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      Promise.all(
        roles.map(async rol => {
          if(!rolesUsuario.some(rolUsuario => rolUsuario.idRol === rol && rolUsuario.idUsuario === userId)){
            if(allRoles.includes(rol)){
              return await queryRunner.manager.save(RolUsuario, {idRol: rol, idUsuario: userId})
            }
            throw Error('No existe rol');
          }else{
            control.splice(control.indexOf(rol, 0), 1);
            return
          }
        })
      );

      Promise.all(
        control.map(async rol => {
          return await queryRunner.manager.delete(RolUsuario, {idRol: rol, idUsuario: userId})
        })
      );

      await queryRunner.commitTransaction()
    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    
    return await (this.dataSource.getRepository(Rol)
    .createQueryBuilder('rol')
    .innerJoinAndSelect('rol.rolUsuario', 'rolUsuario')
    .where('rolUsuario.idUsuario = :id', {id: userId})
    .select('rol')
    .getMany());
  }
}
