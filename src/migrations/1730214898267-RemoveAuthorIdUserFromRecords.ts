import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAuthorIdUserFromRecords1730214898267 implements MigrationInterface {
    name = 'RemoveAuthorIdUserFromRecords1730214898267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_authorIdUser"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_18a924902b2b2a599279b431de7" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_18a924902b2b2a599279b431de7"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_authorIdUser" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
