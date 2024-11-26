import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndRecordsTables1730163212685 implements MigrationInterface {
    name = 'CreateUsersAndRecordsTables1730163212685';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id_user" SERIAL NOT NULL,
                "username" VARCHAR NOT NULL,
                "password" TEXT NOT NULL,
                "email" VARCHAR NOT NULL,
                CONSTRAINT "UQ_username" UNIQUE ("username"),
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id_user")
            )
        `);
        
        await queryRunner.query(`
            CREATE TABLE "records" (
                "id_record" SERIAL NOT NULL,
                "title" VARCHAR NOT NULL,
                "content" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "id_author" INTEGER,  -- Используем id_author, как указано в вашей сущности
                CONSTRAINT "PK_records" PRIMARY KEY ("id_record"),
                CONSTRAINT "FK_author" FOREIGN KEY ("id_author") 
                REFERENCES "users"("id_user") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
