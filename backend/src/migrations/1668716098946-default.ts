import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668716098946 implements MigrationInterface {
    name = 'default1668716098946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "idAccount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "idAccount"`);
    }

}
