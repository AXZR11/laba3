import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveAuthorIdUserFromRecords1730214898267 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
