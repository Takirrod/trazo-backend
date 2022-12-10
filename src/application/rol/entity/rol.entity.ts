import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Paso } from "../../trazo/entity/paso.entity";
import { PasoGuardado } from "../../guardado/entity/paso_guardado.entity";
import { RolUsuario } from "../../../core/authorization/entity/rol_usuario.entity";
import { Trazo } from "../../trazo/entity/trazo.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "rol", schema: process.env.DB_SCHEMA_USUARIOS})
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "rol", length: 20 })
    nombre: string;

    @Column("text", { name: "descripcion", nullable: true })
    descripcion: string;

    @Column("boolean", { name: "es_publico", default: false })
    esPublico: boolean;

    @OneToMany(
        () => RolUsuario,
        (rolUsuario) => rolUsuario.rol
    )
    rolUsuario: RolUsuario[]

    @OneToMany(() => Trazo, (trazo) => trazo.rol)
    trazo: Trazo[]

    @OneToMany(() => Paso, (paso) => paso.rol)
    paso: Paso[]

    @OneToMany(() => PasoGuardado, (pasoGuardado) => pasoGuardado.rol)
    pasoGuardado: PasoGuardado[]

    constructor(data?: Partial<Rol>) {
        super()
        if (data) Object.assign(this, data)
    }
}
