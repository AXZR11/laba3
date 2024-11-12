import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorIdUserFromRecords1730215809329 implements MigrationInterface {
    name = 'AddAuthorIdUserFromRecords1730215809329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "id_author"`);
        await queryRunner.query(`ALTER TABLE "records" ADD "id_author" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "id_author"`);
        await queryRunner.query(`ALTER TABLE "records" ADD "id_author" integer`);
    }

}
