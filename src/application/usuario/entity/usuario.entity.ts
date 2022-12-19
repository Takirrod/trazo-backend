import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Paso } from "../../trazo/entity/paso.entity";
import { RolUsuario } from "../../../core/authorization/entity/rol_usuario.entity";
import { Trazo } from "../../trazo/entity/trazo.entity";
import * as dotenv from 'dotenv'
import { PasoGuardado } from "src/application/guardado/entity/paso_guardado.entity";

dotenv.config()

@Entity({ name: "usuario", schema: process.env.DB_SCHEMA_USUARIOS })
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "email", length: 150 })
  email: string;

  @Column("character varying", { name: "usuario", length: 150 })
  usuario: string;

  @Column("character varying", { name: "nombre", length: 255 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 255 })
  apellido: string;

  // @Column("text", { name: "descripcion", nullable: true })
  // descripcion: string;

  @Column("boolean", { name: "activo", default: true })
  activo: boolean;

  @Column("character varying", { name: "url_perfil", length: 255 })
  urlPerfil: string;

  @OneToMany(
    () => RolUsuario,
    (rolUsuario) => rolUsuario.usuario
  )
  rolUsuario: RolUsuario[]

  @OneToMany(
    () => Trazo,
    (trazo) => trazo.usuario
  )
  trazo: Trazo[]

  @OneToMany(
    () => Paso,
    (paso) => paso.usuario
  )
  paso: Paso[]

  @OneToMany(
    () => PasoGuardado,
    (paso) => paso.usuario
  )
  pasoGuardado: PasoGuardado[]

  constructor(data?: Partial<Usuario>) {
    super()
    if (data) Object.assign(this, data)
  }
}
