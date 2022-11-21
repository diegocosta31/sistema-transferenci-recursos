import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668790370279 implements MigrationInterface {
    name = 'default1668790370279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "FK_6755d7049a344c78eccd21e8a77"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "UQ_6755d7049a344c78eccd21e8a77"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "UserName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "UserName" integer`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "UQ_6755d7049a344c78eccd21e8a77" UNIQUE ("UserName")`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "FK_6755d7049a344c78eccd21e8a77" FOREIGN KEY ("UserName") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
