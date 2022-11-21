import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668794521085 implements MigrationInterface {
    name = 'default1668794521085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "balanceId" TO "balance"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_ee0e324a6ec4891a73f04f5f77c" TO "UQ_df3fb126ca664ccdeaf23dfeff4"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_df3fb126ca664ccdeaf23dfeff4" FOREIGN KEY ("balance") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_df3fb126ca664ccdeaf23dfeff4"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_df3fb126ca664ccdeaf23dfeff4" TO "UQ_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "balance" TO "balanceId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c" FOREIGN KEY ("balanceId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
