import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Rol } from "../entity/rol.entity";

@Injectable()
export class RolRepository {
  constructor(private dataSource: DataSource) {}

  async findRolesByUserId(userId: number): Promise<Rol[]>{
    const query = this.dataSource
    .getRepository(Rol)
    .createQueryBuilder('rol')
    .innerJoinAndSelect('rol.rolUsuario', 'rolUsuario')
    .where('rolUsuario.id_usuario = :id_usuario', {id_usuario: userId})
    .select([
      'rol.id',
      'rol.nombre',
      'rol.descripcion',
      'rol.esPublico'
    ])

    return await query.getMany()
  }

  async findRolById(rolId: number): Promise<Rol>{
    const query = this.dataSource
    .getRepository(Rol)
    .createQueryBuilder('rol')
    .where('rol.id = :rolId', {rolId: rolId})
    .select('rol')

    return await query.getOne()
  }

  async saveRol(rol: Rol): Promise<Rol>{
    return await this.dataSource.getRepository(Rol).save(rol);
  }

  async findAllRoles(): Promise<Rol[]>{
    return await this.dataSource.getRepository(Rol).find();
  }

  async findPublicRoles(): Promise<Rol[]>{
    return await this.dataSource.getRepository(Rol).find({where: {esPublico: true}})
  }

  async updateRol(partialRol: Partial<Rol>){
    return await this.dataSource.getRepository(Rol).update(partialRol.id, partialRol)
  }

  async deleteRol(rolId: number){
    return await this.dataSource.getRepository(Rol).delete(rolId)
  }
}