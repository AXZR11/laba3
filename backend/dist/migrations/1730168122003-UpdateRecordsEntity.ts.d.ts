import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateRecordsEntity1730168122003 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
