import { MigrationInterface, QueryRunner } from "typeorm"
import * as fs from 'fs';

export class initialSeeds1671539019424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const queriesUsuario = await fs.readFileSync(
                __dirname + '/usuario.sql',
                { encoding: 'utf-8' }
            )

            const queriesRol = await fs.readFileSync(
                __dirname + '/rol.sql',
                { encoding: 'utf-8' }
            )

            const queriesRolUsuario = await fs.readFileSync(
                __dirname + '/rol_usuario.sql',
                { encoding: 'utf-8' }
            )

            const queriesTrazoGuardado = await fs.readFileSync(
                __dirname + '/trazo_guardado.sql',
                { encoding: 'utf-8' }
            )

            const queriesPasoGuardado = await fs.readFileSync(
                __dirname + '/paso_guardado.sql',
                { encoding: 'utf-8' }
            )

            await queryRunner.query(queriesUsuario.toString())
            await queryRunner.query(queriesRol.toString())
            await queryRunner.query(queriesRolUsuario.toString())
            await queryRunner.query(queriesTrazoGuardado.toString())
            await queryRunner.query(queriesPasoGuardado.toString())
        } catch (e) {
            console.log(' error..............', e)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
