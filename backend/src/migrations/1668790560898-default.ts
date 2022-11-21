import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668790560898 implements MigrationInterface {
    name = 'default1668790560898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balanceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "balanceId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ee0e324a6ec4891a73f04f5f77c" UNIQUE ("balanceId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c" FOREIGN KEY ("balanceId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
