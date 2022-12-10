import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { RolUsuario } from "../entity/rol_usuario.entity";

@Injectable()
export class RolUsuarioRepository {
  constructor(
    private dataSource: DataSource
  ) {}

  async saveRolUser(rolUsuario: RolUsuario): Promise<RolUsuario>{
    return await this.dataSource.getRepository(RolUsuario).save(rolUsuario);
  }

  async findRolUsuarioByRolId(rolId: number): Promise<RolUsuario[]>{
    return await this.dataSource.getRepository(RolUsuario).find({where: {idRol: rolId}})
  }
}