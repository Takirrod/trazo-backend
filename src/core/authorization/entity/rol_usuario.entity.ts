import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "../../../application/rol/entity/rol.entity";
import { Usuario } from "../../../application/usuario/entity/usuario.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "rol_usuario", schema: process.env.DB_SCHEMA_USUARIOS})
export class RolUsuario extends BaseEntity {
    @Column({
        name: 'id_rol',
        type: 'integer',
        nullable: false,
        primary: true
    })
    idRol: number
    
    @ManyToOne(() => Rol, (rol) => rol.rolUsuario, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: 'id_rol', referencedColumnName: 'id' }])
    rol: Rol

    @Column({
        name: 'id_usuario',
        type: 'integer',
        nullable: false,
        primary: true
    })
    idUsuario: number

    @ManyToOne(() => Usuario, (usuario) => usuario.rolUsuario, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'id' }])
    usuario: Usuario

    constructor(data?: Partial<RolUsuario>) {
        super()
        if (data) Object.assign(this, data)
    }
}
