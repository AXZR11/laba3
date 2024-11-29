"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersAndRecordsTables1730163212685 = void 0;
class CreateUsersAndRecordsTables1730163212685 {
    constructor() {
        this.name = 'CreateUsersAndRecordsTables1730163212685';
    }
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUsersAndRecordsTables1730163212685 = CreateUsersAndRecordsTables1730163212685;
//# sourceMappingURL=1730163212685-CreateUsersAndRecordsTables.ts.js.map