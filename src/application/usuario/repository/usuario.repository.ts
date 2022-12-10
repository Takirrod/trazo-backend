import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Usuario } from "../entity/usuario.entity";

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: DataSource) {}

  async saveUser(user: Usuario): Promise<Usuario>{
    return await this.dataSource.getRepository(Usuario).save(user);
  }

  async findByEmail(email: string): Promise<Usuario>{
    return await this.dataSource.getRepository(Usuario).findOneBy({email: email});
  }
}