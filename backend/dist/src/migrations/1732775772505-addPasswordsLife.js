"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPasswordsLife1732775772505 = void 0;
class AddPasswordsLife1732775772505 {
    constructor() {
        this.name = 'AddPasswordsLife1732775772505';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" varchar(20) DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isBlocked" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordUpdatedAt" TIMESTAMP NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "previousPasswords" json NOT NULL DEFAULT '[]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "previousPasswords"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordUpdatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBlocked"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }
}
exports.AddPasswordsLife1732775772505 = AddPasswordsLife1732775772505;
//# sourceMappingURL=1732775772505-addPasswordsLife.js.map