import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRecordsEntity1730168122003 implements MigrationInterface {
    name = 'UpdateRecordsEntity1730168122003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_author"`);

        await queryRunner.query(`ALTER TABLE "records" ADD "authorIdUser" INTEGER`);

        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_authorIdUser" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_authorIdUser"`);

        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "authorIdUser"`);

        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_author" FOREIGN KEY ("id_author") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
