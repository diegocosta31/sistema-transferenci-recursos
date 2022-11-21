import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668993827135 implements MigrationInterface {
    name = 'default1668993827135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "debitedAccountId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "debitedAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "creditedAccountId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "creditedAccountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "debitedAccountId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "debitedAccountId" character varying NOT NULL`);
    }

}
