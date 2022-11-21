import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668796815287 implements MigrationInterface {
    name = 'default1668796815287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "idAccount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "idAccount"`);
    }

}
