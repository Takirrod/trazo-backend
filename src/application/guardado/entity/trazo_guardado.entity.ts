import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { PasoGuardado } from "./paso_guardado.entity";
import * as dotenv from 'dotenv'

dotenv.config()

@Entity({name: "trazo_guardado", schema: process.env.DB_SCHEMA_GUARDADOS })
export class TrazoGuardado extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "nombre", length: 100 })
    nombre: string;

    @Column("integer", { name: "cantidad_pasos" })
    cantidadPasos: number;

    @Column("text", { name: "descripcion", nullable: true })
    descripcion: string;

    @OneToMany(() => PasoGuardado, (pasoGuardado) => pasoGuardado.trazoGuardado)
    pasoGuardado: PasoGuardado[];

    constructor(data?: Partial<TrazoGuardado>) {
        super()
        if (data) Object.assign(this, data)
    }
}
