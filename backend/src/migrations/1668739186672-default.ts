import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668739186672 implements MigrationInterface {
    name = 'default1668739186672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "createdAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "createdAt" TIMESTAMP NOT NULL`);
    }

}
