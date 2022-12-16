import { Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolService } from 'src/application/rol/service/rol.service';
import { Paso } from 'src/application/trazo/entity/paso.entity';
import { RolUsuario } from 'src/core/authorization/entity/rol_usuario.entity';
import { DataSource } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UserExists } from '../dto/user_exists.dto';
import { Usuario } from '../entity/usuario.entity';
import { UsuarioRepository } from '../repository/usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    @Inject(RolRepository)
    private rolRepository: RolRepository,
    private dataSource: DataSource,
    private rolService: RolService
  ){}

  async saveUser(user: RegisterDto): Promise<Usuario>{
    let userCreated: Usuario
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      const newUser = new Usuario({
        email: user.email,
        usuario: user.usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        urlPerfil: user.urlPerfil
      })
      userCreated = await queryRunner.manager.save(Usuario, newUser)

      const roles: Rol[] = await this.rolService.getRolesById(user.idRol)

      await Promise.all(
        roles.map(async rol => {
          const rolUser = new RolUsuario({
            idRol: rol.id,
            idUsuario: userCreated.id
          })
    
          return await queryRunner.manager.save(RolUsuario, rolUser)
        })
      )
      await queryRunner.commitTransaction()

    }catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
    return userCreated
  }

  async getUserByEmail(email: string): Promise<UserExists>{
    const user: Usuario = await this.usuarioRepository.findByEmail(email);
    let roles: Rol[];
    if(user){
      roles = await this.rolRepository.findRolesByUserId(user.id);
    }
    return {
      existe: user? true: false,
      idUsuario: user? user.id: null,
      rol: roles? roles: null
    }
  }

  async deleteUser(usuarioId: number){
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let response;
    try{
      const pasos: Paso[] = await queryRunner.manager.find(Paso, {where: {idUsuario: usuarioId}})
      Promise.all(
        pasos.map(async paso => {
          const partialPaso: Partial<Paso> = {
            idUsuario: null
          }
          return await queryRunner.manager.update(Paso, paso.id, partialPaso)
        })
      )
      response = await queryRunner.manager.delete(Usuario, usuarioId)
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

  async getAllUsers(){
    return await this.usuarioRepository.findAllUsers();
  }
}
