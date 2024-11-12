"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuthorIdUserFromRecords1730215809329 = void 0;
class AddAuthorIdUserFromRecords1730215809329 {
    constructor() {
        this.name = 'AddAuthorIdUserFromRecords1730215809329';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "id_author"`);
        await queryRunner.query(`ALTER TABLE "records" ADD "id_author" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "id_author"`);
        await queryRunner.query(`ALTER TABLE "records" ADD "id_author" integer`);
    }
}
exports.AddAuthorIdUserFromRecords1730215809329 = AddAuthorIdUserFromRecords1730215809329;
//# sourceMappingURL=1730215809329-AddAuthorIdUserFromRecords.js.map