import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668789740311 implements MigrationInterface {
    name = 'default1668789740311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "UserName" integer`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "UQ_6755d7049a344c78eccd21e8a77" UNIQUE ("UserName")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "balanceId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ee0e324a6ec4891a73f04f5f77c" UNIQUE ("balanceId")`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "FK_6755d7049a344c78eccd21e8a77" FOREIGN KEY ("UserName") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c" FOREIGN KEY ("balanceId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "FK_6755d7049a344c78eccd21e8a77"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balanceId"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "UQ_6755d7049a344c78eccd21e8a77"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "UserName"`);
    }

}
