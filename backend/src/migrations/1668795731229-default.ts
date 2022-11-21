import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668795731229 implements MigrationInterface {
    name = 'default1668795731229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2f0c51228218524638c0610c9dc"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "Account" TO "account"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_2f0c51228218524638c0610c9dc" TO "UQ_dd44b05034165835d6dcc18d684"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44b05034165835d6dcc18d684" FOREIGN KEY ("account") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44b05034165835d6dcc18d684"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_dd44b05034165835d6dcc18d684" TO "UQ_2f0c51228218524638c0610c9dc"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "account" TO "Account"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2f0c51228218524638c0610c9dc" FOREIGN KEY ("Account") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
