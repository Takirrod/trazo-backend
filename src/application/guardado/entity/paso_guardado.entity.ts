import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "../../rol/entity/rol.entity";
import { TrazoGuardado } from "./trazo_guardado.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "paso_guardado", schema: process.env.DB_SCHEMA_GUARDADOS })
export class PasoGuardado extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "nombre", length: 100 })
    nombre: string;

    @Column("text", { name: "descripcion", nullable: true })
    descripcion: string;
    
    @Column("integer", { name: "paso_numero" })
    pasoNumero: number;

    @Column("integer", {name: "id_rol"})
    idRol: number;

    @ManyToOne(() => Rol, (rol) => rol.pasoGuardado,{
        nullable: false
    })
    @JoinColumn([{name: "id_rol", referencedColumnName: "id"}])
    rol: Rol;

    @Column("integer", {name: "id_trazo_guardado"})
    idTrazoGuardado: number;

    @ManyToOne(() => TrazoGuardado, (trazoGuardado) => trazoGuardado.pasoGuardado,{
        nullable: false
    })
    @JoinColumn([{name: "id_trazo_guardado", referencedColumnName: "id"}])
    trazoGuardado: TrazoGuardado;
}
