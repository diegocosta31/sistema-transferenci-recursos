import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668794735721 implements MigrationInterface {
    name = 'default1668794735721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_df3fb126ca664ccdeaf23dfeff4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "idAccount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_df3fb126ca664ccdeaf23dfeff4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "Account" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_2f0c51228218524638c0610c9dc" UNIQUE ("Account")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2f0c51228218524638c0610c9dc" FOREIGN KEY ("Account") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2f0c51228218524638c0610c9dc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_2f0c51228218524638c0610c9dc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "Account"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "balance" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_df3fb126ca664ccdeaf23dfeff4" UNIQUE ("balance")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "idAccount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_df3fb126ca664ccdeaf23dfeff4" FOREIGN KEY ("balance") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
