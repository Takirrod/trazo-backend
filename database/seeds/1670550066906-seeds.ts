import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';

export class seeds1670550066906 implements MigrationInterface {
  name = 'seeds1670550066906'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const queriesUsuario = await fs.readFileSync(
      __dirname + '/usuario.sql',
      {encoding: 'utf-8'}
    )

    const queriesRol = await fs.readFileSync(
      __dirname + '/rol.sql',
      {encoding: 'utf-8'}
    )

    const queriesRolUsuario = await fs.readFileSync(
      __dirname + '/rol_usuario.sql',
      {encoding: 'utf-8'}
    )

    const queriesTrazo = await fs.readFileSync(
      __dirname + '/trazo.sql',
      {encoding: 'utf-8'}
    )

    const queriesPaso = await fs.readFileSync(
      __dirname + '/paso.sql',
      {encoding: 'utf-8'}
    )

    await queryRunner.query(queriesUsuario.toString())
    await queryRunner.query(queriesRol.toString())
    await queryRunner.query(queriesRolUsuario.toString())
    await queryRunner.query(queriesTrazo.toString())
    await queryRunner.query(queriesPaso.toString())
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
