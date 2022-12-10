import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Paso } from "./paso.entity";
import { Rol } from "../../rol/entity/rol.entity";
import { Usuario } from "../../usuario/entity/usuario.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "trazo", schema: process.env.DB_SCHEMA_TRAZOS})
export class Trazo extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "nombre", length: 100 })
    nombre: string;

    @Column("integer", { name: "cantidad_pasos" })
    cantidadPasos: number;

    @Column("text", { name: "descripcion", nullable: true })
    descripcion: string;

    @Column("boolean", { name: "esta_terminado" })
    estaTerminado: boolean;

    @Column("integer", { name: "paso_actual" })
    pasoActual: number;

    @Column("integer", {name: "id_usuario", nullable: true, default: null})
    idUsuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.trazo,{
        nullable: true,
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "id_usuario", referencedColumnName: "id"}])
    usuario: Usuario;

    @Column("integer", {name: "id_rol", nullable: true, default: null})
    idRol: number;

    @ManyToOne(() => Rol, (rol) => rol.trazo,{
        nullable: true,
    })
    @JoinColumn([{name: "id_rol", referencedColumnName: "id"}])
    rol: Rol;

    @OneToMany(() => Paso, (paso) => paso.trazo)
    paso: Paso[];

    constructor(data?: Partial<Trazo>) {
        super()
        if (data) Object.assign(this, data)
    }
}
