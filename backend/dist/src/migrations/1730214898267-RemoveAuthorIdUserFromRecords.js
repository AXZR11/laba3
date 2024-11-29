"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAuthorIdUserFromRecords1730214898267 = void 0;
class RemoveAuthorIdUserFromRecords1730214898267 {
    constructor() {
        this.name = 'RemoveAuthorIdUserFromRecords1730214898267';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_authorIdUser"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_18a924902b2b2a599279b431de7" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_18a924902b2b2a599279b431de7"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_authorIdUser" FOREIGN KEY ("authorIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.RemoveAuthorIdUserFromRecords1730214898267 = RemoveAuthorIdUserFromRecords1730214898267;
//# sourceMappingURL=1730214898267-RemoveAuthorIdUserFromRecords.js.map