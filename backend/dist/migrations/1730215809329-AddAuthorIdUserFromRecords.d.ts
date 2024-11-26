import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddAuthorIdUserFromRecords1730215809329 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
