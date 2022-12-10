import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "../../rol/entity/rol.entity";
import { Trazo } from "./trazo.entity";
import { Usuario } from "../../usuario/entity/usuario.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "paso", schema: process.env.DB_SCHEMA_TRAZOS })
export class Paso extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "nombre", length: 100 })
    nombre: string;

    @Column("text", { name: "descripcion", nullable: true })
    descripcion: string;

    @Column("boolean", { name: "esta_terminado" })
    estaTerminado: boolean;

    @Column("integer", { name: "paso_numero" })
    pasoNumero: number;

    @Column("integer", {name: "id_usuario", nullable: true})
    idUsuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.paso,{
        nullable: false
    })
    @JoinColumn([{name: "id_usuario", referencedColumnName: "id"}])
    usuario: Usuario;

    @Column("integer", {name: "id_rol", nullable: true})
    idRol: number;

    @ManyToOne(() => Rol, (rol) => rol.paso,{
        nullable: false
    })
    @JoinColumn([{name: "id_rol", referencedColumnName: "id"}])
    rol: Rol;

    @Column("integer", {name: "id_trazo"})
    idTrazo: number;

    @ManyToOne(() => Trazo, (trazo) => trazo.paso,{
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_trazo", referencedColumnName: "id"}])
    trazo: Trazo;

    constructor(data?: Partial<Paso>) {
        super()
        if (data) Object.assign(this, data)
    }
}
