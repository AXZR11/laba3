import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordsLife1732775772505 implements MigrationInterface {
    name = 'AddPasswordsLife1732775772505';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" varchar(20) DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isBlocked" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordUpdatedAt" TIMESTAMP NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "previousPasswords" json NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "previousPasswords"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordUpdatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBlocked"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }
}
