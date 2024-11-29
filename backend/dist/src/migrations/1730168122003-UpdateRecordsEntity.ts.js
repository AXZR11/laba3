"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecordsEntity1730168122003 = void 0;
class UpdateRecordsEntity1730168122003 {
    constructor() {
        this.name = 'UpdateRecordsEntity1730168122003';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_author"`);
        await queryRunner.query(`ALTER TABLE "records" ADD "authorIdUser" INTEGER`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_authorIdUser" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_authorIdUser"`);
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "authorIdUser"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_author" FOREIGN KEY ("id_author") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateRecordsEntity1730168122003 = UpdateRecordsEntity1730168122003;
//# sourceMappingURL=1730168122003-UpdateRecordsEntity.ts.js.map