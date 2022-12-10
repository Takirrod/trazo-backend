import { Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolUsuario } from '../entity/rol_usuario.entity';
import { RolUsuarioRepository } from '../repository/rol_usuario.repository';

@Injectable()
export class RolUsuarioService {
  constructor(
    @Inject(RolRepository)
    private rolRepository: RolRepository,
    @Inject(RolUsuarioRepository)
    private rolUsuarioRepository: RolUsuarioRepository
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
}
